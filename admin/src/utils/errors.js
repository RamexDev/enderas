/**
 * @fileoverview API error types and user-facing message extraction.
 */

/** Structured error thrown by the Axios response interceptor. */
export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} [status]
   * @param {Array} [errors]
   */
  constructor(message, status, errors = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

/**
 * Returns a human-readable message from any thrown value.
 * @param {unknown} error
 * @returns {string}
 */
export function getErrorMessage(error) {
  if (error instanceof ApiError) return error.message
  if (error?.response?.data?.message) return error.response.data.message
  if (error?.message) return error.message
  return 'An unexpected error occurred'
}

/**
 * Extracts validation error strings from an API error response.
 * @param {unknown} error
 * @returns {string[]}
 */
export function getValidationErrors(error) {
  if (error instanceof ApiError && error.errors?.length) {
    return error.errors.map((e) => e.msg || e.message).filter(Boolean)
  }
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors.map((e) => e.msg || e.message).filter(Boolean)
  }
  return []
}
