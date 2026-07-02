import { Router, Request, Response, NextFunction } from "express";
import pool from "../config/db";
import redisClient from "../config/redis";

const router = Router();

/**
 * @route   GET /api/slots
 * @desc    Get all training slots enriched with live capacity from Redis
 * @access  Public/Private (depending on your setup)
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Fetch static slots configuration from PostgreSQL
    const dbResult = await pool.query(
      "SELECT id, day, time, max_capacity FROM training_slots ORDER BY id"
    );

    // 2. Enrich each slot with its live available capacity from Redis
    const slotsWithCapacity = await Promise.all(
      dbResult.rows.map(async (slot) => {
        const capacity = await redisClient.get(`slot:${slot.id}:capacity`);
        
        return {
          ...slot,
          // If Redis key doesn't exist yet, default to the slot's max_capacity
          current_capacity: capacity !== null ? parseInt(capacity, 10) : slot.max_capacity,
        };
      })
    );

    // 3. Send the response back to the client
    res.json(slotsWithCapacity);
  } catch (err) {
    // Forward any internal server errors to the global errorHandler middleware
    next(err);
  }
});

export default router;