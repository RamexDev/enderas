/**
 * User role constants and hierarchy for authorization checks.
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  EDITOR: 'editor',
};

/** Ordered from highest to lowest privilege (reserved for future use) */
export const ROLE_HIERARCHY = [ROLES.SUPER_ADMIN, ROLES.EDITOR];
