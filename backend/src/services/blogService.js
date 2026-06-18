import { Op } from 'sequelize';
import { Post, Category, User } from '../models/index.js';
import { generateSlug } from '../utils/slug.js';

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
      const { PostCategory } = await import('../models/index.js');
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
  if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
  return post;
}

export async function getPostById(id) {
  const post = await Post.findByPk(id, { include: postIncludes });
  if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
  return post;
}

export async function createPost(data, authorId) {
  const slug = data.slug || generateSlug(data.title);
  const postData = {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: data.content,
    featured_image: data.featured_image,
    status: data.status || 'draft',
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    author_id: authorId,
    published_at: data.status === 'published' ? new Date() : null,
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
  if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });

  const slug = data.slug || (data.title ? generateSlug(data.title) : undefined);
  const updateData = { ...data };
  if (slug) updateData.slug = slug;

  await post.update(updateData);

  if (data.categories) {
    const categories = await Category.findAll({ where: { id: data.categories } });
    await post.setCategories(categories);
  }

  return getPostById(post.id);
}

export async function deletePost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
  await post.destroy();
}

export async function publishPost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
  await post.update({ status: 'published', published_at: new Date() });
  return post;
}

export async function unpublishPost(id) {
  const post = await Post.findByPk(id);
  if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
  await post.update({ status: 'draft', published_at: null });
  return post;
}

export async function listCategories() {
  return Category.findAll({ order: [['name', 'ASC']] });
}

export async function createCategory(data) {
  const slug = data.slug || generateSlug(data.name);
  return Category.create({ ...data, slug });
}

export async function updateCategory(id, data) {
  const cat = await Category.findByPk(id);
  if (!cat) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  const slug = data.slug || (data.name ? generateSlug(data.name) : undefined);
  await cat.update({ ...data, ...(slug ? { slug } : {}) });
  return cat;
}

export async function deleteCategory(id) {
  const cat = await Category.findByPk(id);
  if (!cat) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  await cat.destroy();
}
