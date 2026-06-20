import * as faqService from '../../services/faqService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await faqService.listFaqs(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit), 'FAQs retrieved');
  } catch (error) { next(error); }
}

export async function create(req, res, next) {
  try {
    const faq = await faqService.createFaq(req.body);
    return successResponse(res, faq, 'FAQ created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const faq = await faqService.updateFaq(req.params.id, req.body);
    return successResponse(res, faq, 'FAQ updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await faqService.deleteFaq(req.params.id);
    return successResponse(res, null, 'FAQ deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function toggleStatus(req, res, next) {
  try {
    const faq = await faqService.toggleFaqStatus(req.params.id);
    return successResponse(res, faq, 'FAQ status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
