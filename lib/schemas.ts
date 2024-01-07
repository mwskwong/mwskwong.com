import { z } from 'zod';

export const contactFormSchema = z.discriminatedUnion('showInGuestbook', [
  z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Email should be an email'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
    showInGuestbook: z.literal(false),
  }),
  z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .email('Email should be an email')
      .optional()
      .or(z.literal('')),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
    showInGuestbook: z.literal(true),
  }),
]);
export type ContactFormSchema = z.infer<typeof contactFormSchema>;
