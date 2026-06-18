/**
 * Services business logic — CRUD and public listing with active-only filter.
 */

import { Service } from '../models/index.js';
import { generateSlug } from '../utils/slug.js';
import { pickFields } from '../utils/pickFields.js';

const SERVICE_FIELDS = [
  'title', 'slug', 'short_description', 'description', 'image',
  'cta_text', 'cta_link', 'meta_title', 'meta_description', 'is_active',
];

/** Admin: paginated list of all services (including inactive) */
export async function listServices(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await Service.findAndCountAll({
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

/** Public: paginated list of active services only */
export async function listPublicServices(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await Service.findAndCountAll({
    where: { is_active: true },
    order: [['created_at', 'ASC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

/** Public: fetch single active service by slug */
export async function getServiceBySlug(slug) {
  const service = await Service.findOne({ where: { slug, is_active: true } });
  if (!service) throw Object.assign(new Error('Service not found'), { statusCode: 404 });
  return service;
}

export async function getServiceById(id) {
  const service = await Service.findByPk(id);
  if (!service) throw Object.assign(new Error('Service not found'), { statusCode: 404 });
  return service;
}

export async function createService(data) {
  const safe = pickFields(data, SERVICE_FIELDS);
  const slug = safe.slug || generateSlug(safe.title);
  return Service.create({ ...safe, slug });
}

export async function updateService(id, data) {
  const service = await Service.findByPk(id);
  if (!service) throw Object.assign(new Error('Service not found'), { statusCode: 404 });
  const safe = pickFields(data, SERVICE_FIELDS);
  const slug = safe.slug || (safe.title ? generateSlug(safe.title) : undefined);
  await service.update({ ...safe, ...(slug ? { slug } : {}) });
  return service;
}

export async function deleteService(id) {
  const service = await Service.findByPk(id);
  if (!service) throw Object.assign(new Error('Service not found'), { statusCode: 404 });
  await service.destroy();
}

/** Toggle is_active flag for a service */
export async function toggleServiceStatus(id) {
  const service = await Service.findByPk(id);
  if (!service) throw Object.assign(new Error('Service not found'), { statusCode: 404 });
  await service.update({ is_active: !service.is_active });
  return service;
}
