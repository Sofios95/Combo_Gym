import cron from "node-cron";
import pool from "../config/db";
import { loadSlotsToRedis } from "../config/redis";

const syncSlotsWithRedis = async () => {
  console.log("🔄 Ξεκινάει η ανανέωση των slots στο Redis...");
  try {
    const result = await pool.query(
      "SELECT id, max_capacity FROM training_slots",
    );
    await loadSlotsToRedis(result.rows);
    console.log("✅ Το Redis ενημερώθηκε επιτυχώς!");
  } catch (err) {
    console.error("❌ Αποτυχία συγχρονισμού Redis:", err);
  }
};

export const initScheduler = () => {
  // 1. Εκτέλεση μία φορά στο ξεκίνημα του server
  syncSlotsWithRedis();

  // 2. Προγραμματισμένο ραντεβού κάθε Κυριακή στις 12:00 (ώρα Αθήνας)
  // Αφαιρέθηκε το 'scheduled: true' που δημιουργούσε το Error
  cron.schedule(
    "0 12 * * 0",
    async () => {
      console.log("⏰ Κυριακή 12:00: Αυτόματο εβδομαδιαίο refresh...");
      await syncSlotsWithRedis();
    },
    {
      timezone: "Europe/Athens",
    },
  );

  console.log("📅 Scheduler: On guard for Sunday 12:00 (Athens Time)");
};
