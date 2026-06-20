import * as galleryService from '../../services/galleryService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function listCategories(req, res, next) {
  try {
    const data = await galleryService.listCategories();
    return successResponse(res, data, 'Gallery categories retrieved');
  } catch (error) { next(error); }
}

export async function createCategory(req, res, next) {
  try {
    const data = await galleryService.createCategory(req.body);
    return successResponse(res, data, 'Category created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const data = await galleryService.updateCategory(req.params.id, req.body);
    return successResponse(res, data, 'Category updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await galleryService.deleteCategory(req.params.id);
    return successResponse(res, null, 'Category deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await galleryService.listGalleryItems(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit), 'Gallery items retrieved');
  } catch (error) { next(error); }
}

export async function create(req, res, next) {
  try {
    const item = await galleryService.createGalleryItem(req.body);
    return successResponse(res, item, 'Gallery item created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const item = await galleryService.updateGalleryItem(req.params.id, req.body);
    return successResponse(res, item, 'Gallery item updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await galleryService.deleteGalleryItem(req.params.id);
    return successResponse(res, null, 'Gallery item deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
