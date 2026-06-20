import { Op } from 'sequelize';
import { Post, Category, PostCategory } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import { generateSlug } from '../utils/slug.js';
import { pickFields } from '../utils/pickFields.js';
import { POST_FIELDS, BLOG_CATEGORY_FIELDS } from '../constants/fieldAllowlists.js';

const postIncludes = [
  { association: 'author', attributes: ['id', 'name'] },
  { association: 'categories', attributes: ['id', 'name', 'slug'], through: { attributes: [] } },
];

export async function listPosts(page = 1, limit = 10, filters = {}) {
  const offset = (page - 1) * limit;
  const where = {};

  if (filters.status) where.status = filters.status;
  if (filters.search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${filters.search}%` } },
      { excerpt: { [Op.like]: `%${filters.search}%` } },
    ];
  }
  if (filters.category) {
    const cat = await Category.findOne({ where: { slug: filters.category } });
    if (cat) {
      const postIds = await PostCategory.findAll({ where: { category_id: cat.id }, attributes: ['post_id'] });
      where.id = { [Op.in]: postIds.map((p) => p.post_id) };
    }
  }

  const { count, rows } = await Post.findAndCountAll({
    where,
    include: postIncludes,
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });

  return { data: rows, total: count, page, limit };
}

export async function getPostBySlug(slug) {
  const post = await Post.findOne({ where: { slug }, include: postIncludes });
  if (!post) throw new AppError('Post not found', 404);
  return post;
}

export async function getPostById(id) {
  const post = await Post.findByPk(id, { include: postIncludes });
  if (!post) throw new AppError(`Post with ID ${id} not found`, 404);
  return post;
}

export async function createPost(data, authorId) {
  const safe = pickFields(data, POST_FIELDS);
  const slug = safe.slug || generateSlug(safe.title);
  const postData = {
    ...safe,
    slug,
    author_id: authorId,
    status: safe.status || 'draft',
    published_at: safe.status === 'published' ? new Date() : null,
  };

  const post = await Post.create(postData);

  if (data.categories && data.categories.length > 0) {
    const categories = await Category.findAll({ where: { id: data.categories } });
    await post.setCategories(categories);
  }

  return getPostById(post.id);
}

export async function updatePost(id, data) {
  const post = await Post.findByPk(id);
  if (!post) throw new AppError('Post not found', 404);

  const safe = pickFields(data, POST_FIELDS);
  const slug = safe.slug || (safe.title ? generateSlug(safe.title) : undefined);

  if (safe.status === 'published' && post.status !== 'published') {
    safe.published_at = new Date();
  } else if (safe.status === 'draft' && post.status === 'published') {
    safe.published_at = null;
  }

  await post.update({ ...safe, ...(slug ? { slug } : {}) });

  if (data.categories) {
    const categories = await Category.findAll({ where: { id: data.categories } });
    await post.setCategories(categories);
  }

  return getPostById(post.id);
}

export async function deletePost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw new AppError(`Post with ID ${id} not found`, 404);
  await post.destroy();
}

export async function publishPost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw new AppError(`Post with ID ${id} not found`, 404);
  await post.update({ status: 'published', published_at: new Date() });
  return post;
}

export async function unpublishPost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw new AppError(`Post with ID ${id} not found`, 404);
  await post.update({ status: 'draft', published_at: null });
  return post;
}

export async function listCategories() {
  return Category.findAll({ order: [['name', 'ASC']] });
}

export async function createCategory(data) {
  const safe = pickFields(data, BLOG_CATEGORY_FIELDS);
  const slug = safe.slug || generateSlug(safe.name);
  return Category.create({ ...safe, slug });
}

export async function updateCategory(id, data) {
  const cat = await Category.findByPk(id);
  if (!cat) throw new AppError(`Category with ID ${id} not found`, 404);
  const safe = pickFields(data, BLOG_CATEGORY_FIELDS);
  const slug = safe.slug || (safe.name ? generateSlug(safe.name) : undefined);
  await cat.update({ ...safe, ...(slug ? { slug } : {}) });
  return cat;
}

export async function deleteCategory(id) {
  const cat = await Category.findByPk(id);
  if (!cat) throw new AppError(`Category with ID ${id} not found`, 404);
  await cat.destroy();
}
