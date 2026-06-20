import { Faq } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import { pickFields } from '../utils/pickFields.js';
import { FAQ_FIELDS } from '../constants/fieldAllowlists.js';

export async function listFaqs(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await Faq.findAndCountAll({
    order: [['created_at', 'ASC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function createFaq(data) {
  return Faq.create(pickFields(data, FAQ_FIELDS));
}

export async function updateFaq(id, data) {
  const faq = await Faq.findByPk(id);
  if (!faq) throw new AppError(`FAQ with ID ${id} not found`, 404);
  await faq.update(pickFields(data, FAQ_FIELDS));
  return faq;
}

export async function deleteFaq(id) {
  const faq = await Faq.findByPk(id);
  if (!faq) throw new AppError(`FAQ with ID ${id} not found`, 404);
  await faq.destroy();
}

export async function toggleFaqStatus(id) {
  const faq = await Faq.findByPk(id);
  if (!faq) throw new AppError(`FAQ with ID ${id} not found`, 404);
  await faq.update({ is_active: !faq.is_active });
  return faq;
}
