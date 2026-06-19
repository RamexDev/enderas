import { Testimonial } from '../models/index.js';
import { pickFields } from '../utils/pickFields.js';
import { TESTIMONIAL_FIELDS } from '../constants/fieldAllowlists.js';

export async function listTestimonials(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await Testimonial.findAndCountAll({
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function createTestimonial(data) {
  return Testimonial.create(pickFields(data, TESTIMONIAL_FIELDS));
}

export async function updateTestimonial(id, data) {
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) throw Object.assign(new Error('Testimonial not found'), { statusCode: 404 });
  await testimonial.update(pickFields(data, TESTIMONIAL_FIELDS));
  return testimonial;
}

export async function deleteTestimonial(id) {
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) throw Object.assign(new Error('Testimonial not found'), { statusCode: 404 });
  await testimonial.destroy();
}

export async function toggleTestimonialStatus(id) {
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) throw Object.assign(new Error('Testimonial not found'), { statusCode: 404 });
  await testimonial.update({ is_active: !testimonial.is_active });
  return testimonial;
}
