import * as teamService from '../../services/teamService.js';
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js';
import { getPagination, getPaginationMeta } from '../../utils/pagination.js';

export async function index(req, res, next) {
  try {
    const { page, limit } = getPagination(req.query);
    const result = await teamService.listTeamMembers(page, limit);
    return paginatedResponse(res, result.data, getPaginationMeta(result.total, result.page, result.limit), 'Team members retrieved');
  } catch (error) { next(error); }
}

export async function create(req, res, next) {
  try {
    const member = await teamService.createTeamMember(req.body);
    return successResponse(res, member, 'Team member created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const member = await teamService.updateTeamMember(req.params.id, req.body);
    return successResponse(res, member, 'Team member updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await teamService.deleteTeamMember(req.params.id);
    return successResponse(res, null, 'Team member deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function toggleStatus(req, res, next) {
  try {
    const member = await teamService.toggleTeamMemberStatus(req.params.id);
    return successResponse(res, member, 'Team member status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
