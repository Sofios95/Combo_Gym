import { Router, Request, Response } from "express";
import pool from "../config/db";
import redisClient, { loadSlotsToRedis } from "../config/redis";

const router = Router();

/**
 * @route   POST /api/system/refresh-slots
 * @desc    Fetch slots from PostgreSQL and sync/reset capacities in Redis

 */
// Changed from GET to POST because it modifies data state in Redis
router.post("/refresh-slots", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, max_capacity FROM training_slots");
    
    // Core function that resets the keys in Redis for the new week
    await loadSlotsToRedis(result.rows);
    
    res.json({ message: "Redis Sync Complete! System refreshed for the week. 🔄" });
  } catch (err) {
    res.status(500).json({ message: "Error syncing Redis with database slots." });
  }
});

/**
 * @route   GET /api/system/test-redis
 * @desc    Sanity check to verify Redis connectivity
 * @access  Private (Admin Only)
 */
router.get("/test-redis", async (req: Request, res: Response) => {
  try {
    await redisClient.set("test_key", "Acer Power!");
    const val = await redisClient.get("test_key");
    res.json({ redis_check: val });
  } catch (err) {
    res.status(500).json({ message: "Redis connection failed." });
  }
});

export default router;