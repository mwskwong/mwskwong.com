import {
  Output,
  email,
  literal,
  merge,
  minLength,
  object,
  optional,
  string,
  union,
  variant,
} from 'valibot';

const baseContactFormSchema = object({
  name: string([minLength(1, 'Name is required')]),
  message: string([minLength(1, 'Message is required')]),
});

export const contactFormSchema = variant('showInGuestbook', [
  merge([
    baseContactFormSchema,
    object({
      email: string([
        minLength(1, 'Email is required'),
        email('Not a valid email'),
      ]),
      subject: string([minLength(1, 'Subject is required')]),
      showInGuestbook: literal(false),
    }),
  ]),
  merge([
    baseContactFormSchema,
    object({
      email: optional(
        union([string([email('Not a valid email')]), literal('')]),
      ),
      subject: optional(string()),
      showInGuestbook: literal(true),
    }),
  ]),
]);

export type ContactFormData = Output<typeof contactFormSchema>;
