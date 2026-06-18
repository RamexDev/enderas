/**
 * Vitest global setup — extends matchers, polyfills storage, resets state between tests.
 */
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

/** In-memory Storage implementation for Node test runs. */
function createMemoryStorage() {
  let store = {}
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = String(value)
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
    get length() {
      return Object.keys(store).length
    },
    key: (index) => Object.keys(store)[index] ?? null,
  }
}

function ensureStorage() {
  if (typeof globalThis.localStorage?.clear !== 'function') {
    Object.defineProperty(globalThis, 'localStorage', {
      value: createMemoryStorage(),
      configurable: true,
    })
  }
  if (typeof globalThis.sessionStorage?.clear !== 'function') {
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: createMemoryStorage(),
      configurable: true,
    })
  }
}

ensureStorage()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.unstubAllEnvs()
})

beforeEach(() => {
  ensureStorage()
  localStorage.clear()
  sessionStorage.clear()
  vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:5000/api/v1')
  vi.stubEnv('VITE_UPLOAD_BASE_URL', 'http://localhost:5000/uploads')
  vi.stubEnv('VITE_APP_NAME', 'Enderas CMS')
})
