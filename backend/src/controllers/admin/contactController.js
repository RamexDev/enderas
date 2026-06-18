import * as contactService from '../../services/contactService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function getContactPage(req, res, next) {
  try {
    const data = await contactService.getContactPage();
    return successResponse(res, data);
  } catch (error) { next(error); }
}

export async function updateContactPage(req, res, next) {
  try {
    const data = await contactService.updateContactPage(req.body);
    return successResponse(res, data, 'Contact page updated');
  } catch (error) { next(error); }
}

export async function listMessages(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const archived = req.query.archived === 'true';
    const result = await contactService.listContactMessages(page, limit, archived);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}

export async function showMessage(req, res, next) {
  try {
    const msg = await contactService.getContactMessage(req.params.id);
    return successResponse(res, msg);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function markRead(req, res, next) {
  try {
    const msg = await contactService.markMessageRead(req.params.id);
    return successResponse(res, msg, 'Message marked as read');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function archive(req, res, next) {
  try {
    const msg = await contactService.archiveMessage(req.params.id);
    return successResponse(res, msg, 'Message archived');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
