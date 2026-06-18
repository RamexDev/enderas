/**
 * JWT authentication middleware.
 * Verifies Bearer access token and attaches user to req.user.
 */

import { verifyAccessToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';
import { User } from '../models/index.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 'Authentication required', 401);
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }

    if (!user.is_active) {
      return errorResponse(res, 'Account is disabled', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', 401);
    }
    return errorResponse(res, 'Authentication failed', 401);
  }
}
