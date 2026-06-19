/**
 * Role-based authorization middleware factory.
 * Usage: authorize(ROLES.SUPER_ADMIN) or authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR)
 */

import { errorResponse } from '../utils/response.js';
import logger from '../utils/logger.js';

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      logger.warn('Authorization check failed — no user on request', { req });
      return errorResponse(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn('Authorization denied', {
        req,
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: allowedRoles,
      });
      return errorResponse(res, 'Insufficient permissions', 403);
    }

    next();
  };
}
