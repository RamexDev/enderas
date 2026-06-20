/**
 * @fileoverview Error helpers used by the API layer and components.
 */

export class ApiError extends Error {
  constructor(message, status, errors = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

/**
 * Returns a human-readable message from any thrown error.
 * @param {Error|ApiError} error
 * @returns {string}
 */
export function getErrorMessage(error) {
  if (!error) return 'An unexpected error occurred'
  if (error instanceof ApiError) return error.message
  if (error.response?.data?.message) return error.response.data.message
  if (error.message) return error.message
  return 'An unexpected error occurred'
}

/**
 * Returns a list of validation error strings from an API response.
 * @param {Error|ApiError} error
 * @returns {string[]}
 */
export function getValidationErrors(error) {
  if (!error) return []
  if (error instanceof ApiError) return error.errors || []
  if (error.response?.data?.errors) {
    const errs = error.response.data.errors
    if (Array.isArray(errs)) return errs.map((e) => (typeof e === 'string' ? e : e.msg))
  }
  return []
}
