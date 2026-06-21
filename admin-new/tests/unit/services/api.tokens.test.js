import { describe, expect, it, beforeEach } from 'vitest'
import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
} from '@/services/api'

describe('token storage', () => {
  beforeEach(() => {
    clearStoredTokens()
  })

  it('stores tokens in sessionStorage', () => {
    setStoredTokens({
      accessToken: 'access-123',
      refreshToken: 'refresh-456',
    })

    const tokens = getStoredTokens()
    expect(tokens.accessToken).toBe('access-123')
    expect(tokens.refreshToken).toBe('refresh-456')
    expect(sessionStorage.getItem('enderas_access_token')).toBe('access-123')
    expect(sessionStorage.getItem('enderas_refresh_token')).toBe('refresh-456')
  })

  it('clears tokens from sessionStorage', () => {
    setStoredTokens({ accessToken: 'a', refreshToken: 'r' })
    clearStoredTokens()

    expect(getStoredTokens().accessToken).toBeNull()
    expect(getStoredTokens().refreshToken).toBeNull()
    expect(sessionStorage.getItem('enderas_access_token')).toBeNull()
    expect(sessionStorage.getItem('enderas_refresh_token')).toBeNull()
  })
})
