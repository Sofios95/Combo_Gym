import { Router } from "express";
import pool from "../config/db"; // Βεβαιώσου ότι το path για το pool είναι σωστό
import redisClient from "../config/redis"; // Βεβαιώσου ότι το path για το redis είναι σωστό

const router = Router();

// ΠΡΟΣΟΧΗ: Εδώ βάζουμε "/" γιατί το "/api/slots" έχει οριστεί ήδη στο κεντρικό αρχείο
router.get("/", async (req, res, next) => {
  try {
    // 1. Φέρνουμε τα σταθερά slots από την Postgres
    const dbResult = await pool.query(
      "SELECT id, day, time, max_capacity FROM training_slots ORDER BY id"
    );

    // 2. Εμπλουτίζουμε με το ζωντανό capacity από το Redis
    const slotsWithCapacity = await Promise.all(
      dbResult.rows.map(async (slot) => {
        const capacity = await redisClient.get(`slot:${slot.id}:capacity`);
        return {
          ...slot,
          // Αν δεν υπάρχει στο Redis, δείχνουμε το max_capacity της βάσης
          current_capacity: capacity !== null ? parseInt(capacity) : slot.max_capacity,
        };
      })
    );

    res.json(slotsWithCapacity);
  } catch (err) {
    next(err); // Στέλνει το σφάλμα στον errorHandler που έχεις ορίσει
  }
});

export default router;