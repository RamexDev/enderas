import * as blogService from '../../services/blogService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const filters = {
      search: req.query.search || null,
      category: req.query.category || null,
      status: 'published',
    };
    const result = await blogService.listPosts(page, limit, filters);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}

export async function show(req, res, next) {
  try {
    const post = await blogService.getPostBySlug(req.params.slug);
    if (post.status !== 'published') {
      return errorResponse(res, 'Post not found', 404);
    }
    return successResponse(res, post);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
