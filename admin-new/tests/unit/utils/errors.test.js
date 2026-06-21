import { describe, expect, it } from 'vitest'
import { ApiError, getErrorMessage, getValidationErrors } from '@/utils/errors'

describe('ApiError', () => {
  it('stores message, status, and validation errors', () => {
    const error = new ApiError('Validation failed', 400, [{ msg: 'Required' }])
    expect(error.message).toBe('Validation failed')
    expect(error.status).toBe(400)
    expect(error.errors).toHaveLength(1)
  })
})

describe('getErrorMessage', () => {
  it('reads message from ApiError instances', () => {
    expect(getErrorMessage(new ApiError('Unauthorized', 401))).toBe('Unauthorized')
  })

  it('reads message from axios-style errors', () => {
    expect(getErrorMessage({ response: { data: { message: 'Not found' } } })).toBe('Not found')
  })

  it('falls back to a generic message', () => {
    expect(getErrorMessage({})).toBe('An unexpected error occurred')
  })
})

describe('getValidationErrors', () => {
  it('maps ApiError validation entries to strings', () => {
    const error = new ApiError('Bad request', 400, [{ msg: 'Email is required' }])
    expect(getValidationErrors(error)).toEqual(['Email is required'])
  })

  it('returns an empty array when no validation errors exist', () => {
    expect(getValidationErrors(new Error('fail'))).toEqual([])
  })
})
