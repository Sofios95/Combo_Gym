import cron from "node-cron";
import pool from "../config/db";
import redisClient from "../config/redis";

/**
 * Synchronizes database training slots with Redis cache.
 * @param forceRefresh If true, overwrites existing Redis keys (used for weekly resets).
 */
const syncSlotsWithRedis = async (forceRefresh = false) => {
  console.log("🔄 Checking training slots in Redis...");
  try {
    // 1. Get slots from PostgreSQL
    const result = await pool.query("SELECT id, max_capacity FROM training_slots");
    
    // 2. Create an array of promises to run them in parallel (High Performance)
    const syncPromises = result.rows.map(async (slot) => {
      const key = `slot:${slot.id}:capacity`;
      
      if (forceRefresh) {
        // Sunday morning: Hard reset everything
        await redisClient.set(key, slot.max_capacity.toString());
      } else {
        // Server restart: Only set if the key doesn't exist
        const exists = await redisClient.exists(key);
        if (!exists) {
          await redisClient.set(key, slot.max_capacity.toString());
        }
      }
    });

    // 3. Execute all Redis operations concurrently (No more blocking for-loop!)
    await Promise.all(syncPromises);
    
    console.log(`✅ Redis sync complete. (Force Refresh: ${forceRefresh})`);
  } catch (err) {
    console.error("❌ Failed to sync slots with Redis:", err);
  }
};

/**
 * Initializes the automated scheduling system.
 */
export const initScheduler = () => {
  // 1. On server startup, fill missing keys without overwriting current active bookings
  syncSlotsWithRedis(false);

  // 2. Schedule a hard reset every Sunday at 12:00 PM Athens time
  cron.schedule(
    "0 12 * * 0",
    async () => {
      console.log("⏰ Sunday 12:00 PM: Running full weekly system reset...");
      await syncSlotsWithRedis(true); 
    },
    { timezone: "Europe/Athens" }
  );

  console.log("📅 Automation Scheduler: Active");
};