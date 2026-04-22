import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Χρήση του Secret από το .env ή default για το local development
const JWT_SECRET = process.env.JWT_SECRET || 'boxer_secret_key_2026';

/**
 * Middleware για την προστασία των routes. 
 * Ελέγχει αν το JWT token είναι έγκυρο.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Λήψη του Header (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: '⛔ Μη εξουσιοδοτημένη πρόσβαση. Λείπει το token.' 
    });
  }

  // 2. Απομόνωση του token (αφαιρούμε το "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 3. Επαλήθευση και αποκωδικοποίηση
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; role: string };
    
    // 4. Προσθήκη των στοιχείων του χρήστη στο request object
    // Χρησιμοποιούμε (req as any) για να μην παραπονιέται η TS που το 'user' δεν υπάρχει στο default Request type
    (req as any).user = decoded;
    
    // 5. Συνέχεια στον επόμενο Controller
    next();
  } catch (error) {
    // Αν το token έχει λήξει ή είναι πειραγμένο
    return res.status(401).json({ 
      message: '⚠️ Το token δεν είναι έγκυρο ή έχει λήξει.' 
    });
  }
};