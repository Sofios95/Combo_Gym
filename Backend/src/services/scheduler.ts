import cron from "node-cron";
import pool from "../config/db";
import redisClient from "../config/redis";
import { QueryResult } from "pg";

const syncSlotsWithRedis = async (forceRefresh = false) => {
  console.log("--- 🥊 COMBO GYM WEEKLY RESET STARTED ---");
  console.log("🔄 Έλεγχος slots στο Redis...");

  let result: QueryResult<any> | null = null;
  const maxRetries = 5;
  const delayMs = 5000;

  // Retry logic για να ξυπνήσει η Postgres αν είναι σε sleep mode
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      result = await pool.query("SELECT id, max_capacity FROM training_slots");
      break; // Αν πετύχει το query, βγαίνει από το loop
    } catch (err) {
      console.error(`⚠️ Απόπειρα ${attempt}/${maxRetries} απέτυχε. Η βάση πιθανόν κοιμάται...`);
      if (attempt === maxRetries) {
        console.error("❌ Αποτυχία συγχρονισμού Redis μετά από 5 προσπάθειες:", err);
        return; // Σταματάει την εκτέλεση αν εξαντληθούν οι προσπάθειες
      }
      // Αναμονή 5 δευτερολέπτων πριν την επόμενη δοκιμή
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  // Έλεγχος για το TypeScript ώστε να είναι σίγουρο ότι το result δεν είναι null
  if (!result) return;

  try {
    for (const slot of result.rows) {
      const key = `slot:${slot.id}:capacity`;
      const exists = await redisClient.exists(key);

      // Αν είναι forceRefresh (Κυριακή) ή αν ΔΕΝ υπάρχει το κλειδί, γράψε
      if (forceRefresh || !exists) {
        await redisClient.set(key, slot.max_capacity.toString());
      }
    }
    console.log(`✅ Το Redis συγχρονίστηκε (Force: ${forceRefresh})`);
  } catch (err) {
    console.error("❌ Σφάλμα κατά την εγγραφή στο Redis:", err);
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