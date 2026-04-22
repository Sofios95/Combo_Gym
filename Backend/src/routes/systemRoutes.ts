import { Router } from "express";
import pool from "../config/db";
import redisClient, { loadSlotsToRedis } from "../config/redis";

const router = Router();

// GET /api/system/refresh
router.get("/refresh-slots", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, max_capacity FROM training_slots");
    await loadSlotsToRedis(result.rows);
    res.send("🔄 Redis Sync Complete!");
  } catch (err) {
    res.status(500).send("Error syncing Redis");
  }
});

// GET /api/system/test-redis
router.get("/test-redis", async (req, res) => {
  await redisClient.set("test_key", "Acer Power!");
  const val = await redisClient.get("test_key");
  res.send(`Redis Check: ${val}`);
});

export default router;