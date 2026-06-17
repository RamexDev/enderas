import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .refine((v) => v.replace(/[^0-9]/g, '').length >= 10, 'Please enter a valid phone number.'),
  subject: z.string().min(3, 'Please tell us what this is about.'),
  message: z.string().min(15, 'Please share a bit more detail (at least 15 characters).'),
})

export const loginSchema = z.object({
  password: z.string().min(1, 'Password is required.'),
})

export const serviceSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1, 'Slug is required.'),
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  description: z.string().min(1, 'Description is required.'),
  icon: z.string().min(1, 'Icon is required.'),
  image: z.string().url('Image must be a valid URL.'),
  features: z.array(z.string()).min(1, 'At least one feature is required.'),
  displayOrder: z.number().optional(),
  active: z.boolean().optional(),
})

export const galleryItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required.'),
  category: z.string().min(1, 'Category is required.'),
  image: z.string().url('Image must be a valid URL.'),
  location: z.string().min(1, 'Location is required.'),
  value: z.string().optional(),
  displayOrder: z.number().optional(),
})

export const blogPostSchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(1, 'Slug is required.'),
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  category: z.string().min(1, 'Category is required.'),
  author: z.string().min(1, 'Author is required.'),
  date: z.string().min(1, 'Date is required.'),
  readTime: z.coerce.number().min(1, 'Read time is required.'),
  image: z.string().url('Image must be a valid URL.'),
  content: z.string().min(1, 'Content is required.'),
  status: z.enum(['draft', 'published']).optional(),
})

export const settingsSchema = z.object({
  appName: z.string().min(1),
  tagline: z.string().min(1),
  phone: z.string().min(1),
  phoneAlt: z.string().optional(),
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().optional(),
  country: z.string().optional(),
  poBox: z.string().optional(),
  hours: z.string().min(1),
  footerDescription: z.string().min(1),
  mapEmbedUrl: z.string().url(),
  mapDirectionsUrl: z.string().url().optional(),
  mapCoordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  seo: z.object({
    defaultTitle: z.string().min(1),
    defaultDescription: z.string().min(1),
    siteUrl: z.string().url(),
    ogImage: z.string().url(),
  }),
  social: z.array(
    z.object({
      name: z.string(),
      href: z.string(),
      icon: z.string(),
    }),
  ),
})
