import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import redisClient, { bookSlotInRedis } from "../config/redis";

// Mapping για τις μέρες ώστε να μπορούμε να συγκρίνουμε ημερομηνίες
const daysMap: { [key: string]: number } = {
  'Κυριακή': 0, 'Δευτέρα': 1, 'Τρίτη': 2, 'Τετάρτη': 3, 
  'Πέμπτη': 4, 'Παρασκευή': 5, 'Σάββατο': 6
};

// --- CREATE BOOKING ---
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  const slotId = req.params.id; 
  const userId = (req as any).user?.userId;

  if (!userId) return res.status(401).json({ message: "Μη εξουσιοδοτημένος χρήστης." });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Έλεγχος αν το slot υπάρχει και αν είναι "κλειδωμένο" χρονικά (1 ώρα πριν)
    const slotRes = await client.query(
      "SELECT day, time, current_capacity, max_capacity FROM training_slots WHERE id = $1 FOR SHARE", 
      [slotId]
    );

    if (slotRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Το μάθημα δεν βρέθηκε." });
    }

    const { day, time } = slotRes.rows[0];
    const now = new Date();
    const currentDayNum = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [h, m] = time.split(':').map(Number);
    const slotTotalMins = h * 60 + m;

    // Έλεγχος αν η μέρα έχει περάσει ή αν είμαστε στην ίδια μέρα και μένει λιγότερο από 1 ώρα
    const isSameDay = daysMap[day] === currentDayNum;
    const isPastDay = daysMap[day] < currentDayNum && currentDayNum !== 0; // Εξαίρεση αν είναι Κυριακή (refresh day)

    if (isPastDay || (isSameDay && currentMinutes >= slotTotalMins - 60)) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "⚠️ Οι κρατήσεις κλείνουν 1 ώρα πριν την έναρξη!" });
    }

    // 2. Έλεγχος αν έχει ήδη κλείσει θέση
    const existingBooking = await client.query(
      "SELECT id FROM bookings WHERE user_id = $1 AND slot_id = $2 FOR UPDATE",
      [userId, slotId]
    );

    if (existingBooking.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "⚠️ Έχεις ήδη κλείσει θέση για αυτό το μάθημα!" });
    }

    // 3. Έλεγχος Tokens
    const userCheck = await client.query(
      "SELECT tokens FROM users WHERE id = $1 FOR UPDATE", 
      [userId]
    );

    if (userCheck.rows[0].tokens < 1) {
      await client.query("ROLLBACK");
      return res.status(402).json({ message: "❌ Δεν έχεις αρκετά tokens!" });
    }

    // 4. Μείωση θέσης στο Redis (Atomic Fast Validation)
    const { success, remaining } = await bookSlotInRedis(Number(slotId));
    if (!success) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "🚫 Δυστυχώς το μάθημα γέμισε!" });
    }

    // 5. Ενημέρωση Postgres (Tokens, Capacity, Bookings)
    try {
      const userUpdate = await client.query(
        "UPDATE users SET tokens = tokens - 1 WHERE id = $1 RETURNING tokens",
        [userId]
      );
      
      const slotUpdate = await client.query(
        "UPDATE training_slots SET current_capacity = current_capacity - 1 WHERE id = $1 AND current_capacity > 0 RETURNING current_capacity",
        [slotId]
      );

      if (slotUpdate.rows.length === 0) throw new Error("CAPACITY_EXCEEDED");

      await client.query("INSERT INTO bookings (user_id, slot_id) VALUES ($1, $2)", [userId, slotId]);

      await client.query("COMMIT");

      res.status(200).json({
        message: "🎯 Η κράτηση ολοκληρώθηκε!",
        remainingSlots: remaining,
        remainingTokens: userUpdate.rows[0].tokens,
      });

    } catch (dbError: any) {
      await client.query("ROLLBACK");
      await redisClient.incr(`slot:${slotId}:capacity`); // Rollback στο Redis
      if (dbError.message === "CAPACITY_EXCEEDED") {
        return res.status(400).json({ message: "🚫 Το μάθημα γέμισε την τελευταία στιγμή!" });
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

// --- CANCEL BOOKING ---
export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  const slotId = req.params.id;
  const userId = (req as any).user?.userId;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Έλεγχος αν υπάρχει η κράτηση και πότε είναι το μάθημα
    const bookingRes = await client.query(
      `SELECT b.id, s.day, s.time 
       FROM bookings b 
       JOIN training_slots s ON b.slot_id = s.id 
       WHERE b.user_id = $1 AND b.slot_id = $2 FOR UPDATE`,
      [userId, slotId]
    );

    if (bookingRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Δεν βρέθηκε η κράτηση." });
    }

    const { day, time, id: bookingId } = bookingRes.rows[0];
    
    // Έλεγχος αν το μάθημα έχει ήδη ξεκινήσει
    const now = new Date();
    const [h, m] = time.split(':').map(Number);
    const slotTotalMins = h * 60 + m;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (daysMap[day] === now.getDay() && currentMinutes >= slotTotalMins) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "❌ Δεν μπορείς να ακυρώσεις μάθημα που έχει ήθη ξεκινήσει!" });
    }

    // 2. Διαγραφή κράτησης και επιστροφή πόρων
    await client.query("DELETE FROM bookings WHERE id = $1", [bookingId]);
    await client.query("UPDATE users SET tokens = tokens + 1 WHERE id = $1", [userId]);
    await client.query("UPDATE training_slots SET current_capacity = current_capacity + 1 WHERE id = $1", [slotId]);

    await client.query("COMMIT");
    
    // Ενημέρωση Redis
    await redisClient.incr(`slot:${slotId}:capacity`);

    res.status(200).json({ message: "✅ Η ακύρωση ολοκληρώθηκε, το token επιστράφηκε!" });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
};

// --- GET MY BOOKINGS ---
export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.userId;

  if (!userId) return res.status(401).json({ message: "Μη εξουσιοδοτημένος." });

  try {
    const result = await pool.query(
      `SELECT s.id as slot_id, s.day, s.time 
       FROM bookings b 
       JOIN training_slots s ON b.slot_id = s.id 
       WHERE b.user_id = $1 
       ORDER BY s.id ASC`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};