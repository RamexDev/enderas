/**
 * Audit middleware — attaches current user id for downstream created_by/updated_by tracking.
 */

export function auditMiddleware(req, res, next) {
  if (req.user) {
    req.currentUserId = req.user.id;
  }
  next();
}
