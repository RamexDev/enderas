import { useContentStore } from '@/store/useContentStore'

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export async function getBlogPosts() {
  await delay()
  return useContentStore
    .getState()
    .blog.filter((p) => p.status !== 'draft')
}

export async function getAllBlogPosts() {
  await delay()
  return useContentStore.getState().blog
}

export async function getBlogPostBySlug(slug) {
  await delay()
  return useContentStore.getState().blog.find((p) => p.slug === slug && p.status !== 'draft')
}

export async function createBlogPost(post) {
  await delay()
  useContentStore.getState().addBlogPost(post)
  return post
}

export async function updateBlogPost(id, data) {
  await delay()
  useContentStore.getState().updateBlogPost(id, data)
  return useContentStore.getState().blog.find((p) => p.id === id)
}

export async function deleteBlogPost(id) {
  await delay()
  useContentStore.getState().deleteBlogPost(id)
}
