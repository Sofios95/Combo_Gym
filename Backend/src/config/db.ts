import { Pool } from "pg";
import dotenv from "dotenv";

// Φορτώνουμε τις μεταβλητές από το .env (αν δεν έχουν φορτωθεί ήδη στο app.ts)
dotenv.config();

const pool = new Pool({
  // Αν υπάρχει DATABASE_URL (συνηθισμένο σε Docker/Heroku), το χρησιμοποιεί.
  // Αλλιώς χτίζει το config από τα επιμέρους πεδία.
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "combo_gym",
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const connectDB = async () => {
  try {
    // Κάνουμε ένα test query για να βεβαιωθούμε ότι η σύνδεση όντως λειτουργεί
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected: The foundation is ready!");
    client.release(); // Απελευθερώνουμε τον client πίσω στο pool
  } catch (err) {
    console.error("❌ Database connection error:", err);

    // Σημαντικό: Δείχνουμε αν το πρόβλημα είναι οι κενές μεταβλητές
    if (!process.env.DB_PASSWORD) {
      console.warn("⚠️ Warning: DB_PASSWORD is not defined in .env");
    }

    process.exit(1);
  }
};

export default pool;
