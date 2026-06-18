/**
 * @fileoverview User role constants matching the backend `ROLES` enum.
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  EDITOR: 'editor',
}

/** Ordered from highest to lowest privilege (reserved for future hierarchy checks). */
export const ROLE_HIERARCHY = [ROLES.SUPER_ADMIN, ROLES.EDITOR]

/**
 * Returns true when the user has super-admin privileges.
 * @param {string | undefined} role
 * @returns {boolean}
 */
export function isSuperAdmin(role) {
  return role === ROLES.SUPER_ADMIN
}
