import * as settingService from '../../services/settingService.js';
import { successResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    const settings = await settingService.getSettings();
    return successResponse(res, settings);
  } catch (error) { next(error); }
}
