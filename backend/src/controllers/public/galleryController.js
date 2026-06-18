import * as galleryService from '../../services/galleryService.js';
import { successResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const category = req.query.category || null;
    const result = await galleryService.listGalleryItems(page, limit, category);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}
