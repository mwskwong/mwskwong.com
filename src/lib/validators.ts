import { z } from 'zod';

const baseContactForm = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(1, 'Message is required'),
});

export const contactForm = z.discriminatedUnion('showInGuestbook', [
  baseContactForm.extend({
    email: z.string().min(1, 'Email is required').email('Not a valid email'),
    subject: z.string().min(1, 'Subject is required'),
    showInGuestbook: z.literal(false),
  }),
  baseContactForm.extend({
    email: z.string().email('Not a valid email').optional().or(z.literal('')),
    subject: z.string().optional(),
    showInGuestbook: z.literal(true),
  }),
]);

export type ContactForm = z.infer<typeof contactForm>;
