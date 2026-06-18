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
