import { GalleryCategory, GalleryItem } from '../models/index.js';
import { generateSlug } from '../utils/slug.js';
import { pickFields } from '../utils/pickFields.js';
import { GALLERY_CATEGORY_FIELDS, GALLERY_ITEM_FIELDS } from '../constants/fieldAllowlists.js';

export async function listCategories() {
  return GalleryCategory.findAll({ order: [['name', 'ASC']] });
}

export async function createCategory(data) {
  const safe = pickFields(data, GALLERY_CATEGORY_FIELDS);
  const slug = safe.slug || generateSlug(safe.name);
  return GalleryCategory.create({ ...safe, slug });
}

export async function updateCategory(id, data) {
  const cat = await GalleryCategory.findByPk(id);
  if (!cat) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  const safe = pickFields(data, GALLERY_CATEGORY_FIELDS);
  const slug = safe.slug || (safe.name ? generateSlug(safe.name) : undefined);
  await cat.update({ ...safe, ...(slug ? { slug } : {}) });
  return cat;
}

export async function deleteCategory(id) {
  const cat = await GalleryCategory.findByPk(id);
  if (!cat) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  await cat.destroy();
}

export async function listGalleryItems(page = 1, limit = 10, categorySlug = null) {
  const offset = (page - 1) * limit;
  const where = {};
  if (categorySlug) {
    const cat = await GalleryCategory.findOne({ where: { slug: categorySlug } });
    if (cat) where.category_id = cat.id;
  }
  const { count, rows } = await GalleryItem.findAndCountAll({
    where,
    include: [{ association: 'category', attributes: ['id', 'name', 'slug'] }],
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function createGalleryItem(data) {
  return GalleryItem.create(pickFields(data, GALLERY_ITEM_FIELDS));
}

export async function updateGalleryItem(id, data) {
  const item = await GalleryItem.findByPk(id);
  if (!item) throw Object.assign(new Error('Gallery item not found'), { statusCode: 404 });
  await item.update(pickFields(data, GALLERY_ITEM_FIELDS));
  return item;
}

export async function deleteGalleryItem(id) {
  const item = await GalleryItem.findByPk(id);
  if (!item) throw Object.assign(new Error('Gallery item not found'), { statusCode: 404 });
  await item.destroy();
}
