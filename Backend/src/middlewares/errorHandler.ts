import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Backend Error:', err.stack);

  // Αν το λάθος έχει δικό του status (π.χ. 402 για tokens), κράτα το, αλλιώς βάλε 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Κάτι πήγε στραβά στο εσωτερικό του server.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};