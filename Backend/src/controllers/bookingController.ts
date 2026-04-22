import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import redisClient, { bookSlotInRedis } from "../config/redis";

// --- CREATE BOOKING ---
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  const slotId = req.params.id; 
  const userId = (req as any).user?.userId;

  if (!userId) return res.status(401).json({ message: "Μη εξουσιοδοτημένος χρήστης." });

  const client = await pool.connect();

  try {
    // 1. Ξεκινάμε το Transaction αμέσως για να κλειδώσουμε τα δεδομένα
    await client.query("BEGIN");

    // 2. Έλεγχος Double Booking & Tokens με κλείδωμα (FOR UPDATE)
    // Ελέγχουμε αν έχει ήδη κράτηση
    const existingBooking = await client.query(
      "SELECT id FROM bookings WHERE user_id = $1 AND slot_id = $2 FOR UPDATE",
      [userId, slotId]
    );

    if (existingBooking.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "⚠️ Έχεις ήδη κλείσει θέση για αυτό το μάθημα!" });
    }

    // Ελέγχουμε αν έχει tokens
    const userCheck = await client.query(
      "SELECT tokens FROM users WHERE id = $1 FOR UPDATE", 
      [userId]
    );

    if (userCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε." });
    }

    if (userCheck.rows[0].tokens < 1) {
      await client.query("ROLLBACK");
      return res.status(402).json({ message: "❌ Δεν έχεις αρκετά tokens!" });
    }

    // 3. Μείωση θέσης στο Redis (Fast validation)
    const { success, remaining } = await bookSlotInRedis(Number(slotId));
    if (!success) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "🚫 Δυστυχώς το μάθημα γέμισε!" });
    }

    // 4. Ενημέρωση Postgres
    try {
      // Αφαίρεση token
      const userUpdate = await client.query(
        "UPDATE users SET tokens = tokens - 1 WHERE id = $1 RETURNING tokens",
        [userId]
      );
      
      // Μείωση capacity στην Postgres (Double check)
      const slotUpdate = await client.query(
        "UPDATE training_slots SET current_capacity = current_capacity - 1 WHERE id = $1 AND current_capacity > 0 RETURNING current_capacity",
        [slotId]
      );

      if (slotUpdate.rows.length === 0) {
        throw new Error("CAPACITY_EXCEEDED");
      }

      // Εγγραφή κράτησης
      await client.query(
        "INSERT INTO bookings (user_id, slot_id) VALUES ($1, $2)",
        [userId, slotId]
      );

      await client.query("COMMIT");

      res.status(200).json({
        message: "🎯 Η κράτηση ολοκληρώθηκε!",
        remainingSlots: remaining,
        remainingTokens: userUpdate.rows[0].tokens,
      });

    } catch (dbError: any) {
      await client.query("ROLLBACK");
      await redisClient.incr(`slot:${slotId}:capacity`); // Rollback στο Redis αν αποτύχει η DB
      
      if (dbError.message === "CAPACITY_EXCEEDED") {
        return res.status(400).json({ message: "🚫 Δυστυχώς το μάθημα γέμισε την τελευταία στιγμή!" });
      }
      throw dbError;
    }
  } catch (err) {
    console.error("Booking Error:", err);
    next(err);
  } finally {
    client.release();
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  const slotId = req.params.id;
  const userId = (req as any).user?.userId;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Παίρνουμε την ώρα του μαθήματος
    const slotRes = await client.query("SELECT time, day FROM training_slots WHERE id = $1", [slotId]);
    const bookingCheck = await client.query("SELECT id FROM bookings WHERE user_id = $1 AND slot_id = $2", [userId, slotId]);

    if (bookingCheck.rows.length === 0) {
      throw new Error("Δεν βρέθηκε η κράτηση.");
    }

    // --- LOGIC: Έλεγχος αν προλαβαίνει να ακυρώσει (Προαιρετικό αλλά Pro) ---
    // Εδώ μπορείς να προσθέσεις έλεγχο ώρας. Για τώρα ας το κρατήσουμε απλό:
    // Διαγράφουμε την κράτηση
    await client.query("DELETE FROM bookings WHERE id = $1", [bookingCheck.rows[0].id]);
    
    // Επιστροφή token & capacity
    await client.query("UPDATE users SET tokens = tokens + 1 WHERE id = $1", [userId]);
    await client.query("UPDATE training_slots SET current_capacity = current_capacity + 1 WHERE id = $1", [slotId]);

    await client.query("COMMIT");
    await redisClient.incr(`slot:${slotId}:capacity`);

    res.status(200).json({ message: "✅ Ακυρώθηκε επιτυχώς!" });
  } catch (err: any) {
    await client.query("ROLLBACK");
    res.status(400).json({ message: err.message });
  } finally {
    client.release();
  }
};

// --- GET MY BOOKINGS ---
export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.userId;

  if (!userId) return res.status(401).json({ message: "Μη εξουσιοδοτημένος χρήστης." });

  try {
    const result = await pool.query(
      `SELECT b.slot_id, s.day, s.time 
       FROM bookings b 
       JOIN training_slots s ON b.slot_id = s.id 
       WHERE b.user_id = $1 
       ORDER BY s.id ASC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Fetch Bookings Error:", err);
    next(err);
  }
};