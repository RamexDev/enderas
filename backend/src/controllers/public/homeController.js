import * as homepageService from '../../services/homepageService.js';
import { successResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    const data = await homepageService.getPublicHome();
    return successResponse(res, data);
  } catch (error) { next(error); }
}
