import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[+\d\s\-().]{7,20}$/.test(v),
      'Please enter a valid phone number.',
    ),
  subject: z.string().min(3, 'Please tell us what this is about.'),
  message: z.string().min(15, 'Please share a bit more detail (at least 15 characters).'),
})
