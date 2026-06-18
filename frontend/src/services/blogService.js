/**
 * @fileoverview Blog posts listing and detail data access.
 */

import { blogApi } from './publicApi'
import { mapBlogPost } from '@/utils/mappers'

/**
 * Fetches published blog posts with search, category, and pagination.
 * @param {object} [params] - Query params (`page`, `limit`, `search`, `category`)
 * @returns {Promise<{ data: Array, meta: object }>}
 */
export async function getBlogPosts(params = {}) {
  const result = await blogApi.list(params)
  return { data: result.data.map(mapBlogPost), meta: result.meta }
}

/**
 * Fetches a single published post by slug.
 * @param {string} slug
 * @returns {Promise<object>}
 */
export async function getBlogPostBySlug(slug) {
  const post = await blogApi.getBySlug(slug)
  return mapBlogPost(post)
}
