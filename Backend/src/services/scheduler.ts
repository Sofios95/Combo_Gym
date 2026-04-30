import cron from "node-cron";
import pool from "../config/db";
import redisClient, { loadSlotsToRedis } from "../config/redis";

const syncSlotsWithRedis = async (forceRefresh = false) => {
  console.log("🔄 Έλεγχος slots στο Redis...");
  try {
    const result = await pool.query("SELECT id, max_capacity FROM training_slots");
    
    for (const slot of result.rows) {
      const key = `slot:${slot.id}:capacity`;
      const exists = await redisClient.exists(key);

      // Αν είναι forceRefresh (Κυριακή) ή αν ΔΕΝ υπάρχει το κλειδί (πρώτη φορά/restart), τότε γράψε
      if (forceRefresh || !exists) {
        await redisClient.set(key, slot.max_capacity.toString());
      }
    }
    console.log(`✅ Το Redis συγχρονίστηκε (Force: ${forceRefresh})`);
  } catch (err) {
    console.error("❌ Αποτυχία συγχρονισμού Redis:", err);
  }
};

export const initScheduler = () => {
  // 1. Στο ξεκίνημα του server, ενημερώνουμε ΜΟΝΟ αν λείπουν δεδομένα
  syncSlotsWithRedis(false);

  // 2. Κάθε Κυριακή στις 12:00, κάνουμε υποχρεωτικό reset (Force Refresh)
  cron.schedule(
    "0 12 * * 0",
    async () => {
      console.log("⏰ Κυριακή 12:00: Πλήρες εβδομαδιαίο refresh...");
      await syncSlotsWithRedis(true); 
    },
    { timezone: "Europe/Athens" }
  );

  console.log("📅 Scheduler: Active");
};