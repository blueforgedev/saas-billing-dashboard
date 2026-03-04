import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      role: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

/**
 * Hash password with bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};

/**
 * Generate JWT access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

/**
 * Generate JWT refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Register a new user
 */
export const register = async (req: RegisterRequest): Promise<AuthResponse> => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: req.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'Email already registered',
      };
    }

    // Hash password
    const passwordHash = await hashPassword(req.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: req.email,
        passwordHash,
        firstName: req.firstName || '',
        lastName: req.lastName || '',
        role: 'USER',
      },
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      message: 'Failed to register user',
    };
  }
};

/**
 * Login user
 */
export const login = async (req: LoginRequest): Promise<AuthResponse> => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: req.email },
    });

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    // Verify password
    const isPasswordValid = await comparePassword(req.password, user.passwordHash);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Failed to login',
    };
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      return {
        success: false,
        message: 'Invalid refresh token',
      };
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    return {
      success: true,
      message: 'Token refreshed successfully',
      data: {
        user: {
          id: decoded.id,
          email: decoded.email,
          firstName: undefined,
          lastName: undefined,
          role: decoded.role,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return {
      success: false,
      message: 'Failed to refresh token',
    };
  }
};
