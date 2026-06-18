import { HomePage } from '../../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { successResponse } from '../../utils/response.js';

export async function index(req, res, next) {
  try {
    let homePage = await HomePage.findOne();
    if (!homePage) homePage = await HomePage.create({ id: uuidv4() });
    return successResponse(res, {
      title: homePage.contact_cta_title,
      body: homePage.contact_cta_description,
      primary_label: homePage.contact_cta_button_text,
      primary_link: homePage.contact_cta_button_link,
    });
  } catch (error) { next(error); }
}
