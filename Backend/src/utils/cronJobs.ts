import cron from 'node-cron';
import pool from '../config/db';
import redisClient from '../config/redis';

export const initCronJobs = () => {
  // Ρύθμιση: Κάθε Κυριακή στις 12:00 το μεσημέρι (ώρα Ελλάδος)
  cron.schedule('0 12 * * 0', async () => {
    console.log('--- 🥊 COMBO GYM WEEKLY RESET STARTED ---');
    
    const client = await pool.connect();
    
    try {
      // Έναρξη Transaction στην Postgres
      await client.query('BEGIN');

      // 1. Καθαρισμός κρατήσεων για τη νέα εβδομάδα
      await client.query('DELETE FROM bookings');

      // 2. Επαναφορά χωρητικότητας στην Postgres
      // Εξισώνουμε το current_capacity με το max_capacity για κάθε slot ξεχωριστά
      await client.query('UPDATE training_slots SET current_capacity = max_capacity');

      await client.query('COMMIT');
      console.log('✅ Postgres Reset: Success');

      // 3. Επαναφορά χωρητικότητας στο Redis για ταχύτητα στο Frontend
      const slotsRes = await client.query('SELECT id, max_capacity FROM training_slots');
      
      // Χρήση Pipeline για μαζική ενημέρωση του Redis
      const pipeline = redisClient.multi();
      
      for (const slot of slotsRes.rows) {
        pipeline.set(`slot:${slot.id}:capacity`, slot.max_capacity.toString());
      }
      
      await pipeline.exec();
      
      console.log('✅ Redis Reset: Success');
      console.log('--- 🏁 RESET COMPLETED ---');

    } catch (err) {
      // Αν κάτι πάει στραβά, ακυρώνουμε τις αλλαγές στην Postgres
      await client.query('ROLLBACK');
      console.error('❌ CRITICAL ERROR DURING RESET:', err);
    } finally {
      // Απελευθέρωση του client πίσω στο pool
      client.release();
    }
  }, {
    timezone: "Europe/Athens" 
  });
};