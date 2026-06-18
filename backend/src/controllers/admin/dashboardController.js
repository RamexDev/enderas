import * as dashboardService from '../../services/dashboardService.js';
import { successResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    const stats = await dashboardService.getDashboardStats();
    return successResponse(res, stats);
  } catch (error) { next(error); }
}
