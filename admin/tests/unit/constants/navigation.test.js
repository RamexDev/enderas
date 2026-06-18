import { describe, expect, it } from 'vitest'
import { getVisibleNavGroups } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'

describe('getVisibleNavGroups', () => {
  it('hides super-admin-only routes from editors', () => {
    const groups = getVisibleNavGroups(ROLES.EDITOR)
    const paths = groups.flatMap((g) => g.items.map((i) => i.to))

    expect(paths).toContain(ROUTES.DASHBOARD)
    expect(paths).toContain(ROUTES.TEAM)
    expect(paths).not.toContain(ROUTES.SETTINGS)
    expect(paths).not.toContain(ROUTES.USERS)
  })

  it('shows all routes for super admins', () => {
    const groups = getVisibleNavGroups(ROLES.SUPER_ADMIN)
    const paths = groups.flatMap((g) => g.items.map((i) => i.to))

    expect(paths).toContain(ROUTES.SETTINGS)
    expect(paths).toContain(ROUTES.USERS)
  })

  it('removes empty groups after filtering', () => {
    const groups = getVisibleNavGroups(ROLES.EDITOR)
    expect(groups.every((g) => g.items.length > 0)).toBe(true)
  })
})
