import { describe, expect, it } from 'vitest'
import { ROLES, isSuperAdmin } from '@/constants/roles'

describe('roles', () => {
  it('identifies super admin role', () => {
    expect(isSuperAdmin(ROLES.SUPER_ADMIN)).toBe(true)
    expect(isSuperAdmin(ROLES.EDITOR)).toBe(false)
    expect(isSuperAdmin(undefined)).toBe(false)
  })
})
