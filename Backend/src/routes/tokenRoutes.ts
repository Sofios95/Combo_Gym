import { Router } from "express";
import pool from "../config/db";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Endpoint για το υπόλοιπο των tokens
router.get("/balance", authMiddleware, async (req, res) => {
  const userId = (req as any).user.userId;
  try {
    const result = await pool.query("SELECT tokens FROM users WHERE id = $1", [userId]);
    res.json({ tokens: result.rows[0].tokens });
  } catch (err) {
    console.error("Balance Error:", err);
    res.status(500).json({ message: "Σφάλμα κατά την ανάκτηση του υπολοίπου." });
  }
});

// Endpoint για την "πληρωμή" και αγορά tokens
router.post("/purchase", authMiddleware, async (req, res) => {
  const userId = (req as any).user.userId;
  const { amount, packageTitle } = req.body; // amount: αριθμός tokens, packageTitle: το όνομα του πακέτου για το log

  try {
    console.log(`[Payment System] Processing request for User ID: ${userId} - Package: ${packageTitle}`);

    // 1. Προσομοίωση καθυστέρησης επεξεργασίας από την τράπεζα (1.5 δευτερόλεπτο)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Dummy Πληρωμή: Προσομοίωση τυχαίου σφάλματος (π.χ. 5% πιθανότητα αποτυχίας)
    // Αν θέλεις να τεστάρεις την αποτυχία, μπορείς να αλλάξεις το 0.05 σε 0.5 (50%)
    const isTransactionSuccessful = Math.random() > 0.05;

    if (!isTransactionSuccessful) {
      console.log(`[Payment System] Transaction DECLINED for User ID: ${userId}`);
      return res.status(402).json({ 
        message: "❌ Η συναλλαγή απορρίφθηκε από την τράπεζα. Ελέγξτε τα στοιχεία της κάρτας σας ή το υπόλοιπό σας." 
      });
    }

    // 3. Αν η πληρωμή "εγκριθεί", ενημερώνουμε τη βάση δεδομένων
    const result = await pool.query(
      "UPDATE users SET tokens = tokens + $1 WHERE id = $2 RETURNING tokens",
      [amount, userId]
    );

    console.log(`[Payment System] Transaction APPROVED. New balance for User ${userId}: ${result.rows[0].tokens}`);

    res.json({ 
      message: "✅ Η πληρωμή εγκρίθηκε και τα tokens προστέθηκαν!", 
      newBalance: result.rows[0].tokens 
    });

  } catch (err) {
    console.error("Purchase Error:", err);
    res.status(500).json({ message: "Σφάλμα συστήματος κατά την επεξεργασία της αγοράς." });
  }
});

export default router;