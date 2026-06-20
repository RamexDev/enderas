import * as aboutService from '../../services/aboutService.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export async function getAboutPage(req, res, next) {
  try {
    const data = await aboutService.getAboutPage();
    return successResponse(res, data, 'About page retrieved');
  } catch (error) { next(error); }
}

export async function updateAboutPage(req, res, next) {
  try {
    const data = await aboutService.updateAboutPage(req.body);
    return successResponse(res, data, 'About page updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function listCoreValues(req, res, next) {
  try {
    const data = await aboutService.listCoreValues();
    return successResponse(res, data, 'Core values retrieved');
  } catch (error) { next(error); }
}

export async function createCoreValue(req, res, next) {
  try {
    const data = await aboutService.createCoreValue(req.body);
    return successResponse(res, data, 'Core value created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateCoreValue(req, res, next) {
  try {
    const data = await aboutService.updateCoreValue(req.params.id, req.body);
    return successResponse(res, data, 'Core value updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function deleteCoreValue(req, res, next) {
  try {
    await aboutService.deleteCoreValue(req.params.id);
    return successResponse(res, null, 'Core value deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function listPartners(req, res, next) {
  try {
    const data = await aboutService.listPartners();
    return successResponse(res, data, 'Partners retrieved');
  } catch (error) { next(error); }
}

export async function createPartner(req, res, next) {
  try {
    const data = await aboutService.createPartner(req.body);
    return successResponse(res, data, 'Partner created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updatePartner(req, res, next) {
  try {
    const data = await aboutService.updatePartner(req.params.id, req.body);
    return successResponse(res, data, 'Partner updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function deletePartner(req, res, next) {
  try {
    await aboutService.deletePartner(req.params.id);
    return successResponse(res, null, 'Partner deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function togglePartnerStatus(req, res, next) {
  try {
    const data = await aboutService.togglePartnerStatus(req.params.id);
    return successResponse(res, data, 'Partner status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
