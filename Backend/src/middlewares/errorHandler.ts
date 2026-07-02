import { Request, Response, NextFunction } from 'express';

// Interface to enforce proper typing on custom application errors
interface CustomError extends Error {
  statusCode?: number;
}

/**
 * Global Error Handling Middleware for Express.
 * Catches all unhandled errors thrown inside routes or controllers.
 */
export const errorHandler = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // 1. Log the full error stack in the server console for debugging purposes
  console.error('❌ Backend Error:', err.stack);

  // 2. Fallback to 500 Internal Server Error if a specific status code is not provided
  const statusCode = err.statusCode || 500;
  
  // 3. Fallback to a generic message if a specific one is missing
  const message = err.message || 'Something went wrong on the server.';

  // 4. Send a structured, secure JSON response to the client
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};