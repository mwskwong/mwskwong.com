import { z } from 'zod';

const baseContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(1, 'Message is required'),
});

export const contactFormSchema = z.discriminatedUnion('showInGuestbook', [
  baseContactFormSchema.extend({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('The email address entered is invalid'),
    subject: z.string().min(1, 'Subject is required'),
    showInGuestbook: z.literal(false),
  }),
  baseContactFormSchema.extend({
    email: z
      .string()
      .email('The email address entered is invalid')
      .optional()
      .or(z.literal('')),
    subject: z.string().optional(),
    showInGuestbook: z.literal(true),
  }),
]);
export type ContactFormSchema = z.infer<typeof contactFormSchema>;
