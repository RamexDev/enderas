/**
 * Role-based authorization middleware factory.
 * Usage: authorize(ROLES.SUPER_ADMIN) or authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR)
 */

import { errorResponse } from '../utils/response.js';

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'Insufficient permissions', 403);
    }

    next();
  };
}
