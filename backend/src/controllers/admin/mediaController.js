import * as mediaService from '../../services/mediaService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';
import { Media } from '../../models/index.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await mediaService.listMedia(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit));
  } catch (error) { next(error); }
}

export async function upload(req, res, next) {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const media = await Media.create({
      filename: req.file.filename,
      original_name: req.file.originalname,
      path: req.file.path,
      mime_type: req.file.mimetype,
      file_size: req.file.size,
      uploaded_by: req.user.id,
    });

    return successResponse(res, media, 'File uploaded', 201);
  } catch (error) { next(error); }
}

export async function destroy(req, res, next) {
  try {
    const result = await mediaService.deleteMedia(req.params.id);
    return successResponse(res, null, result.message);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
