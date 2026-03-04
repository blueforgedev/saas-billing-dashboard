import { adminMiddleware, authMiddleware } from '@middleware/authMiddleware';
import { validate, validateQuery } from '@middleware/validationMiddleware';
import {
  deleteUser,
  getUserById,
  listUsers,
  searchUsers,
  updateUserProfile,
} from '@services/userService';
import { paginationSchema, updateUserSchema } from '@utils/validationSchemas';
import { Request, Response, Router } from 'express';

const router = Router();

/**
 * GET /api/v1/users/:id
 * Get user by ID
 */
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user',
    });
  }
});

/**
 * PUT /api/v1/users/:id
 * Update user profile
 */
router.put(
  '/:id',
  authMiddleware,
  validate(updateUserSchema),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, avatar } = req.body;

      // Users can only update their own profile, admins can update anyone
      if (req.user?.id !== id && req.user?.role !== 'ADMIN') {
        res.status(403).json({
          success: false,
          message: 'Unauthorized to update this user',
        });
        return;
      }

      const user = await updateUserProfile(id, {
        firstName,
        lastName,
        avatar,
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user',
      });
    }
  }
);

/**
 * DELETE /api/v1/users/:id
 * Soft delete user
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Users can only delete their own profile, admins can delete anyone
    if (req.user?.id !== id && req.user?.role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        message: 'Unauthorized to delete this user',
      });
      return;
    }

    const user = await deleteUser(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    });
  }
});

/**
 * GET /api/v1/users
 * List all users (admin only)
 */
router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  validateQuery(paginationSchema),
  async (req: Request, res: Response) => {
    try {
      const page = (req.query.page as any) || 1;
      const limit = (req.query.limit as any) || 10;
      const search = (req.query.search as string) || '';

      const skip = (page - 1) * limit;

      let result;
      if (search) {
        result = await searchUsers(search, skip, limit);
      } else {
        result = await listUsers(skip, limit);
      }

      if (!result) {
        res.status(500).json({
          success: false,
          message: 'Failed to list users',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error('List users error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to list users',
      });
    }
  }
);

export default router;
