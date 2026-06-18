import { Faq } from '../models/index.js';

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
  return Faq.create(data);
}

export async function updateFaq(id, data) {
  const faq = await Faq.findByPk(id);
  if (!faq) throw Object.assign(new Error('FAQ not found'), { statusCode: 404 });
  await faq.update(data);
  return faq;
}

export async function deleteFaq(id) {
  const faq = await Faq.findByPk(id);
  if (!faq) throw Object.assign(new Error('FAQ not found'), { statusCode: 404 });
  await faq.destroy();
}

export async function toggleFaqStatus(id) {
  const faq = await Faq.findByPk(id);
  if (!faq) throw Object.assign(new Error('FAQ not found'), { statusCode: 404 });
  await faq.update({ is_active: !faq.is_active });
  return faq;
}
