import * as homepageService from '../../services/homepageService.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export async function getHomePage(req, res, next) {
  try {
    const data = await homepageService.getHomePage();
    return successResponse(res, data, 'Home page retrieved');
  } catch (error) { next(error); }
}

export async function updateHomePage(req, res, next) {
  try {
    const data = await homepageService.updateHomePage(req.body);
    return successResponse(res, data, 'Homepage updated');
  } catch (error) { next(error); }
}

export async function listStatistics(req, res, next) {
  try {
    const data = await homepageService.listStatistics();
    return successResponse(res, data, 'Statistics retrieved');
  } catch (error) { next(error); }
}

export async function createStatistic(req, res, next) {
  try {
    const data = await homepageService.createStatistic(req.body);
    return successResponse(res, data, 'Statistic created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateStatistic(req, res, next) {
  try {
    const data = await homepageService.updateStatistic(req.params.id, req.body);
    return successResponse(res, data, 'Statistic updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function deleteStatistic(req, res, next) {
  try {
    await homepageService.deleteStatistic(req.params.id);
    return successResponse(res, null, 'Statistic deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function listHeroSlides(req, res, next) {
  try {
    const data = await homepageService.listHeroSlides();
    return successResponse(res, data, 'Hero slides retrieved');
  } catch (error) { next(error); }
}

export async function createHeroSlide(req, res, next) {
  try {
    const data = await homepageService.createHeroSlide(req.body);
    return successResponse(res, data, 'Hero slide created', 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateHeroSlide(req, res, next) {
  try {
    const data = await homepageService.updateHeroSlide(req.params.id, req.body);
    return successResponse(res, data, 'Hero slide updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function deleteHeroSlide(req, res, next) {
  try {
    await homepageService.deleteHeroSlide(req.params.id);
    return successResponse(res, null, 'Hero slide deleted');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function toggleHeroSlideStatus(req, res, next) {
  try {
    const data = await homepageService.toggleHeroSlideStatus(req.params.id);
    return successResponse(res, data, 'Hero slide status updated');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
