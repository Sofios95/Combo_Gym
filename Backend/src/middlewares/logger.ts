import { Request, Response, NextFunction } from 'express';

/**
 * Global Request Logger Middleware.
 * Logs the timestamp, HTTP method, and requested URL for every incoming request.
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // 1. Generate a standardized ISO timestamp for consistent log formatting
  const timestamp = new Date().toISOString();
  
  // 2. Log the request details to the server console
  // Note: Using req.originalUrl instead of req.url is safer in Express to capture the full route path
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  
  // 3. Crucial: Pass control to the next middleware or controller in the pipeline
  next(); 
};