/**
 * Standardized API response helpers.
 * All endpoints return { success, message, data?, meta?, errors? }.
 */

/** 2xx success response with optional data payload */
export function successResponse(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, data });
}

/** Error response with optional validation error array */
export function errorResponse(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
}

/** Paginated list response with meta block */
export function paginatedResponse(res, data, meta, message = 'Success') {
  return res.status(200).json({ success: true, message, data, meta });
}
