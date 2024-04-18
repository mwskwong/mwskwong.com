import {
  Output,
  literal,
  merge,
  minLength,
  object,
  optional,
  string,
  union,
  email as vEmail,
  variant,
} from 'valibot';

const baseContactForm = object({
  name: string([minLength(1, 'Name is required')]),
  message: string([minLength(1, 'Message is required')]),
});

export const contactForm = variant('showInGuestbook', [
  merge([
    baseContactForm,
    object({
      email: string([
        minLength(1, 'Email is required'),
        vEmail('Not a valid email'),
      ]),
      subject: string([minLength(1, 'Subject is required')]),
      showInGuestbook: literal(false),
    }),
  ]),
  merge([
    baseContactForm,
    object({
      email: optional(
        union([string([vEmail('Not a valid email')]), literal('')]),
      ),
      subject: optional(string()),
      showInGuestbook: literal(true),
    }),
  ]),
]);

export type ContactForm = Output<typeof contactForm>;
