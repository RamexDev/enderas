import * as blogService from '../../services/blogService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const filters = { status: req.query.status || null, search: req.query.search || null, category: req.query.category || null };
    const result = await blogService.listPosts(page, limit, filters);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit), 'Posts retrieved');
  } catch (error) { next(error); }
}

export async function show(req, res, next) {
  try {
    const post = await blogService.getPostById(req.params.id);
    return successResponse(res, post, 'Post details retrieved');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const post = await blogService.createPost(req.body, req.user.id);
    return successResponse(res, post, 'Post created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const post = await blogService.updatePost(req.params.id, req.body);
    return successResponse(res, post, 'Post updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await blogService.deletePost(req.params.id);
    return successResponse(res, null, 'Post deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function publish(req, res, next) {
  try {
    const post = await blogService.publishPost(req.params.id);
    return successResponse(res, post, 'Post published');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function unpublish(req, res, next) {
  try {
    const post = await blogService.unpublishPost(req.params.id);
    return successResponse(res, post, 'Post unpublished');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function listCategories(req, res, next) {
  try {
    const data = await blogService.listCategories();
    return successResponse(res, data, 'Categories retrieved');
  } catch (error) { next(error); }
}

export async function createCategory(req, res, next) {
  try {
    const data = await blogService.createCategory(req.body);
    return successResponse(res, data, 'Category created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const data = await blogService.updateCategory(req.params.id, req.body);
    return successResponse(res, data, 'Category updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await blogService.deleteCategory(req.params.id);
    return successResponse(res, null, 'Category deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
