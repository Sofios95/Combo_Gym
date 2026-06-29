import { Pool } from "pg";
import dotenv from "dotenv";

// Φορτώνουμε τις μεταβλητές περιβάλλοντος από το .env
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

// Ρύθμιση του Pool ανάλογα με το περιβάλλον (Local ή Railway Production)
const pool = new Pool({
  // 1. Αν υπάρχει έτοιμο DATABASE_URL (συνηθισμένο στο Railway), το χρησιμοποιεί απευθείας
  connectionString: process.env.DATABASE_URL,

  // 2. Αν ΔΕΝ υπάρχει URL, χτίζει τη σύνδεση από τα επιμέρους πεδία (για το localhost σου)
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,

  // 3. SSL Configuration: Απαραίτητο για να σε αφήσει το Railway να συνδεθείς live στην PostgreSQL
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

/**
 * Συναρτήση για τον έλεγχο της σύνδεσης κατά την εκκίνηση του server.
 */
export const connectDB = async () => {
  try {
    // Κάνουμε ένα test query για να βεβαιωθούμε ότι η σύνδεση όντως λειτουργεί
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected: The foundation is ready!");
    client.release(); // Απελευθερώνουμε τον client πίσω στο pool
  } catch (err) {
    console.error("❌ Database connection error:", err);

    // Έλεγχος ασφαλείας: Αν λείπουν τα credentials, βγάζουμε ξεκάθαρη προειδοποίηση
    if (!process.env.DATABASE_URL && !process.env.DB_PASSWORD) {
      console.error("⚠️ FATAL ERROR: Database credentials (DB_PASSWORD or DATABASE_URL) are missing in .env!");
    }

    process.exit(1);
  }
};

export default pool;