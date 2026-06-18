/**
 * Admin services controller — full CRUD for CMS service management.
 */

import * as serviceService from '../../services/serviceService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await serviceService.listServices(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}

export async function show(req, res, next) {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    return successResponse(res, service);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const service = await serviceService.createService(req.body);
    return successResponse(res, service, 'Service created', 201);
  } catch (error) { next(error); }
}

export async function update(req, res, next) {
  try {
    const service = await serviceService.updateService(req.params.id, req.body);
    return successResponse(res, service, 'Service updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await serviceService.deleteService(req.params.id);
    return successResponse(res, null, 'Service deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

/** PATCH /services/:id/status — toggle is_active */
export async function toggleStatus(req, res, next) {
  try {
    const service = await serviceService.toggleServiceStatus(req.params.id);
    return successResponse(res, service, 'Service status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
