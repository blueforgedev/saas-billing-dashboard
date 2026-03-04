import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get user by ID
 */
export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

/**
 * List all users (admin only)
 */
export const listUsers = async (skip: number = 0, take: number = 10) => {
  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatar: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        total,
        skip,
        take,
        pages: Math.ceil(total / take),
      },
    };
  } catch (error) {
    console.error('List users error:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  }
) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Update user error:', error);
    return null;
  }
};

/**
 * Soft delete user
 */
export const deleteUser = async (userId: string) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
      select: {
        id: true,
        email: true,
        deletedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Delete user error:', error);
    return null;
  }
};

/**
 * Search users by email or name
 */
export const searchUsers = async (query: string, skip: number = 0, take: number = 10) => {
  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { email: { contains: query, mode: 'insensitive' } },
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
          ],
          deletedAt: null,
        },
        skip,
        take,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({
        where: {
          OR: [
            { email: { contains: query, mode: 'insensitive' } },
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
          ],
          deletedAt: null,
        },
      }),
    ]);

    return {
      users,
      pagination: {
        total,
        skip,
        take,
        pages: Math.ceil(total / take),
      },
    };
  } catch (error) {
    console.error('Search users error:', error);
    return null;
  }
};
