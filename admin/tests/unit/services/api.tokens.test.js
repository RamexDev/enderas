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

  it('stores tokens in sessionStorage by default', () => {
    setStoredTokens({
      accessToken: 'access-123',
      refreshToken: 'refresh-456',
      remember: false,
    })

    const tokens = getStoredTokens()
    expect(tokens.accessToken).toBe('access-123')
    expect(tokens.refreshToken).toBe('refresh-456')
    expect(tokens.remember).toBe(false)
    expect(sessionStorage.getItem('enderas_access_token')).toBe('access-123')
    expect(localStorage.getItem('enderas_access_token')).toBeNull()
  })

  it('stores tokens in localStorage when remember me is enabled', () => {
    setStoredTokens({
      accessToken: 'access-abc',
      refreshToken: 'refresh-def',
      remember: true,
    })

    const tokens = getStoredTokens()
    expect(tokens.remember).toBe(true)
    expect(localStorage.getItem('enderas_access_token')).toBe('access-abc')
    expect(sessionStorage.getItem('enderas_access_token')).toBeNull()
  })

  it('clears tokens from both storage buckets', () => {
    setStoredTokens({ accessToken: 'a', refreshToken: 'r', remember: true })
    clearStoredTokens()

    expect(getStoredTokens().accessToken).toBeNull()
    expect(getStoredTokens().refreshToken).toBeNull()
    expect(localStorage.getItem('enderas_access_token')).toBeNull()
    expect(sessionStorage.getItem('enderas_refresh_token')).toBeNull()
  })
})
