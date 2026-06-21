export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  EDITOR: 'editor',
}

export const ROLE_HIERARCHY = [ROLES.EDITOR, ROLES.SUPER_ADMIN]

export function isSuperAdmin(role) {
  return role === ROLES.SUPER_ADMIN
}
