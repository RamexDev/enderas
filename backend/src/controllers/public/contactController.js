import { validationResult } from 'express-validator';
import * as contactService from '../../services/contactService.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    const contact = await contactService.getContactPage();
    return successResponse(res, contact);
  } catch (error) { next(error); }
}

export async function submit(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());
    const message = await contactService.submitContactMessage(req.body);
    return successResponse(res, message, 'Message sent successfully', 201);
  } catch (error) { next(error); }
}
