import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '@services/authService';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Authentication middleware to protect routes
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Missing or invalid authorization header',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

/**
 * Admin role middleware
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'ADMIN') {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
    return;
  }
  next();
};

/**
 * Manager role middleware
 */
export const managerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER')) {
    res.status(403).json({
      success: false,
      message: 'Manager access required',
    });
    return;
  }
  next();
};
