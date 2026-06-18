import * as aboutService from '../../services/aboutService.js';
import { successResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    const data = await aboutService.getPublicAbout();
    return successResponse(res, data);
  } catch (error) { next(error); }
}
