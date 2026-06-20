import { validationResult } from 'express-validator';
import * as authService from '../../services/authService.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstMsg = errors.array()[0]?.msg || 'Validation failed';
      return errorResponse(res, firstMsg, 400, errors.array());
    }

    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    return successResponse(res, result, 'Login successful');
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstMsg = errors.array()[0]?.msg || 'Validation failed';
      return errorResponse(res, firstMsg, 400, errors.array());
    }

    const { refresh_token } = req.body;
    const result = await authService.refreshAccessToken(refresh_token);
    return successResponse(res, result, 'Token refreshed');
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const { refresh_token } = req.body;
    const result = await authService.logoutUser(refresh_token || '');
    return successResponse(res, null, result.message);
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    return successResponse(res, user, 'Profile retrieved');
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstMsg = errors.array()[0]?.msg || 'Validation failed';
      return errorResponse(res, firstMsg, 400, errors.array());
    }

    const { old_password, new_password } = req.body;
    const result = await authService.changePassword(req.user.id, old_password, new_password);
    return successResponse(res, null, result.message);
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}
