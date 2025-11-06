import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

/**
 * Higher-order function middleware for Zod validation.
 * Takes a schema and returns Express middleware.
 */
export const validate =
  (schema: z.Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Invalid input data',
          errors: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }

      console.error('Unexpected error in validation middleware:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };