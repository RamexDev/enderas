import { GalleryCategory, GalleryItem } from '../models/index.js';
import { generateSlug } from '../utils/slug.js';

export async function listCategories() {
  return GalleryCategory.findAll({ order: [['name', 'ASC']] });
}

export async function createCategory(data) {
  const slug = data.slug || generateSlug(data.name);
  return GalleryCategory.create({ ...data, slug });
}

export async function updateCategory(id, data) {
  const cat = await GalleryCategory.findByPk(id);
  if (!cat) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  const slug = data.slug || (data.name ? generateSlug(data.name) : undefined);
  await cat.update({ ...data, ...(slug ? { slug } : {}) });
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
  return GalleryItem.create(data);
}

export async function updateGalleryItem(id, data) {
  const item = await GalleryItem.findByPk(id);
  if (!item) throw Object.assign(new Error('Gallery item not found'), { statusCode: 404 });
  await item.update(data);
  return item;
}

export async function deleteGalleryItem(id) {
  const item = await GalleryItem.findByPk(id);
  if (!item) throw Object.assign(new Error('Gallery item not found'), { statusCode: 404 });
  await item.destroy();
}
