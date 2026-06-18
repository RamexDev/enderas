/**
 * Public services controller — read-only endpoints for the website.
 */

import * as serviceService from '../../services/serviceService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

/** GET /public/services — active services only */
export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await serviceService.listPublicServices(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}

/** GET /public/services/:slug — single active service */
export async function show(req, res, next) {
  try {
    const service = await serviceService.getServiceBySlug(req.params.slug);
    return successResponse(res, service);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
