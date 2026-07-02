import { Request, Response } from "express";
import pool from "../config/db";

// Interface to enforce type safety on the incoming request body
interface PurchaseRequestBody {
  amount: number;
}

export const purchaseTokens = async (req: Request, res: Response) => {
  // Cast req.body to our expected interface
  const { amount } = req.body as PurchaseRequestBody; 
  const userId = (req as any).user?.userId;

  // 1. Authentication check
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  // 2. Runtime validation to protect against malicious input (e.g., negative numbers or strings via Postman)
  if (amount === undefined || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "❌ Invalid token amount. Must be a positive number." });
  }

  try {
    // TODO: Integrate Stripe API here in the future.
    // Currently directly updating the database for live production demo purposes.
    const result = await pool.query(
      "UPDATE users SET tokens = tokens + $1 WHERE id = $2 RETURNING tokens",
      [amount, userId]
    );

    res.status(200).json({
      message: `Successfully purchased ${amount} tokens!`,
      newBalance: result.rows[0].tokens
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during payment processing" });
  }
};