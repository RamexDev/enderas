import { validationResult } from 'express-validator';
import * as userService from '../../services/userService.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    const users = await userService.listUsers();
    return successResponse(res, users);
  } catch (error) { next(error); }
}

export async function show(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    return successResponse(res, user);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());
    const user = await userService.createUser(req.body);
    return successResponse(res, user, 'User created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());
    const user = await userService.updateUser(req.params.id, req.body);
    return successResponse(res, user, 'User updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function toggleStatus(req, res, next) {
  try {
    const user = await userService.toggleUserStatus(req.params.id);
    return successResponse(res, user, 'User status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);
    return successResponse(res, null, 'User deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
