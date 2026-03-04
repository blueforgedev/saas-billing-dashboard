import { authMiddleware } from '@middleware/authMiddleware';
import { validate } from '@middleware/validationMiddleware';
import { login, refreshAccessToken, register } from '@services/authService';
import { loginSchema, refreshTokenSchema, registerSchema } from '@utils/validationSchemas';
import { Request, Response, Router } from 'express';

const router = Router();

/**
 * POST /api/v1/auth/register
 * Register a new user
 */
router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const result = await register({
      email,
      password,
      firstName,
      lastName,
    });

    const statusCode = result.success ? 201 : 400;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error('Register endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
});

/**
 * POST /api/v1/auth/login
 * Login user
 */
router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await login({
      email,
      password,
    });

    const statusCode = result.success ? 200 : 401;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
});

/**
 * POST /api/v1/auth/refresh
 * Refresh access token
 */
router.post('/refresh', validate(refreshTokenSchema), async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const result = await refreshAccessToken(refreshToken);

    const statusCode = result.success ? 200 : 401;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error('Refresh token endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Token refresh failed',
    });
  }
});

/**
 * GET /api/v1/auth/me
 * Get current user (requires auth)
 */
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error('Get user endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user',
    });
  }
});

export default router;
