import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

/**
 * Validation middleware factory
 * Usage: router.post('/register', validate(registerSchema), authController.register)
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body
      const validatedData = await schema.parseAsync(req.body);

      // Replace request body with validated data
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: formattedErrors,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Validation failed',
      });
    }
  };
};

/**
 * Query validation middleware
 */
export const validateQuery = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = await schema.parseAsync(req.query);
      req.query = validatedData as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Query validation error',
          errors: formattedErrors,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Query validation failed',
      });
    }
  };
};
