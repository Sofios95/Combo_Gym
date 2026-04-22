import cron from 'node-cron';
import pool from '../config/db';
import redisClient from '../config/redis';

export const initCronJobs = () => {
  // '0 12 * * 0' σημαίνει: 0 λεπτά, 12 η ώρα, κάθε μέρα του μήνα, κάθε μήνα, την 0η μέρα της εβδομάδας (Κυριακή)
  cron.schedule('0 12 * * 0', async () => {
    console.log('--- 🥊 COMBO GYM WEEKLY RESET STARTED ---');
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // 1. Καθαρισμός κρατήσεων (για να ξεκινήσει η νέα εβδομάδα)
      // Αν θες να κρατάς ιστορικό, μπορείς να τα μεταφέρεις σε άλλον πίνακα πρώτα
      await client.query('DELETE FROM bookings');

      // 2. Επαναφορά χωρητικότητας στην Postgres
      // Εδώ βάζουμε 5 (ή όσο είναι το max_capacity σου)
      await client.query('UPDATE training_slots SET current_capacity = 5');

      await client.query('COMMIT');
      console.log('✅ Postgres Reset: Success');

      // 3. Επαναφορά χωρητικότητας στο Redis
      // Πρέπει να πάρουμε όλα τα slot IDs για να κάνουμε reset τα κλειδιά τους
      const slotsRes = await client.query('SELECT id FROM training_slots');
      
      for (const slot of slotsRes.rows) {
        // Θέτουμε ξανά το κλειδί στο Redis στην αρχική τιμή
        await redisClient.set(`slot:${slot.id}:capacity`, 5);
      }
      
      console.log('✅ Redis Reset: Success');
      console.log('--- 🏁 RESET COMPLETED ---');

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ CRITICAL ERROR DURING RESET:', err);
    } finally {
      client.release();
    }
  }, {
    timezone: "Europe/Athens" // ΠΟΛΥ ΣΗΜΑΝΤΙΚΟ για να συγχρονιστεί με την ώρα Ελλάδος
  });
};