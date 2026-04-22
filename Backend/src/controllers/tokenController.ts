import { Request, Response } from "express";
import pool from "../config/db";

export const purchaseTokens = async (req: Request, res: Response) => {
  const { amount } = req.body; // π.χ. 1, 10, 20
  const userId = (req as any).user?.userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Στο μέλλον εδώ θα μπει το Stripe API.
    // Τώρα κάνουμε απευθείας update τη βάση.
    const result = await pool.query(
      "UPDATE users SET tokens = tokens + $1 WHERE id = $2 RETURNING tokens",
      [amount, userId]
    );

    res.status(200).json({
      message: `Επιτυχής αγορά ${amount} tokens!`,
      newBalance: result.rows[0].tokens
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Σφάλμα κατά την πληρωμή" });
  }
};