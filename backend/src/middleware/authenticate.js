/**
 * JWT authentication middleware.
 * Verifies Bearer access token and attaches user to req.user.
 */

import { verifyAccessToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';
import { User } from '../models/index.js';
import logger from '../utils/logger.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      logger.warn('Authentication required — no bearer token', { req });
      return errorResponse(res, 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      logger.warn('Authentication required — empty token', { req });
      return errorResponse(res, 'Authentication required', 401);
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      logger.warn('Authentication failed — user not found', { req, userId: decoded.id });
      return errorResponse(res, 'User not found', 401);
    }

    if (!user.is_active) {
      logger.warn('Authentication failed — account disabled', { req, userId: user.id });
      return errorResponse(res, 'Account is disabled', 403);
    }

    const passwordChangeAllowedPaths = [
      '/api/v1/auth/change-password',
      '/api/v1/auth/me',
      '/api/v1/auth/logout',
    ];

    if (
      user.must_change_password
      && !passwordChangeAllowedPaths.some((allowedPath) => req.originalUrl.startsWith(allowedPath))
    ) {
      logger.warn('Access denied — password change required', { req, userId: user.id });
      return errorResponse(res, 'Password change required before accessing this resource', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.warn('Authentication failed — token expired', { req });
      return errorResponse(res, 'Token expired', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      logger.warn('Authentication failed — invalid token', { req });
      return errorResponse(res, 'Invalid token', 401);
    }
    logger.warn('Authentication failed — unexpected error', { req, error });
    return errorResponse(res, 'Authentication failed', 401);
  }
}
