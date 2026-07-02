import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Set it in your environment.');
}

// 1. Define the interface for the decrypted JWT payload
interface UserPayload {
  userId: number;
  email: string;
  role: string;
}

// 2. Extend the Express Request interface to include our custom user object cleanly
interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

/**
 * Middleware to protect secure routes.
 * Verifies the incoming JWT token in the Authorization header.
 */
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Extract the Authorization header (Expected format: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: '⛔ Unauthorized access. Missing or malformed token.' 
    });
  }

  // Isolate the pure token string
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token integrity using our secret key
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    
    // Attach the decoded user data to the request object safely without using 'as any'
    req.user = decoded;
    
    // Pass control to the next controller/middleware
    next();
  } catch (error) {
    // Triggered if the token is expired, altered, or fake
    return res.status(401).json({ 
      message: '⚠️ Invalid or expired token.' 
    });
  }
};