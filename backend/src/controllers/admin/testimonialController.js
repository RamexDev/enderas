import * as testimonialService from '../../services/testimonialService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await testimonialService.listTestimonials(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}

export async function create(req, res, next) {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body);
    return successResponse(res, testimonial, 'Testimonial created', 201);
  } catch (error) { next(error); }
}

export async function update(req, res, next) {
  try {
    const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
    return successResponse(res, testimonial, 'Testimonial updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await testimonialService.deleteTestimonial(req.params.id);
    return successResponse(res, null, 'Testimonial deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function toggleStatus(req, res, next) {
  try {
    const testimonial = await testimonialService.toggleTestimonialStatus(req.params.id);
    return successResponse(res, testimonial, 'Testimonial status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
