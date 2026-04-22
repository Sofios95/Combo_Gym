import { Router } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'boxer_secret_key_2026';

// 1. REGISTER: Δημιουργία νέου αθλητή
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Κρυπτογράφηση κωδικού
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password, tokens) VALUES ($1, $2, 5) RETURNING id, email", 
      [email, hashedPassword]
    );
    // Του δίνουμε και 5 δωρεάν tokens για καλωσόρισμα!

    res.status(201).json({ message: "🥊 Ο Boxer γράφτηκε στο γυμναστήριο!", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Το email υπάρχει ήδη ή κάτι πήγε στραβά." });
  }
});

// 2. LOGIN: Είσοδος και έκδοση Token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε." });

    // Έλεγχος κωδικού
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Λάθος κωδικός!" });

    // Δημιουργία Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, message: "🔥 Welcome back, Champ!" });
  } catch (err) {
    res.status(500).send("Login Error");
  }
});

export default router;