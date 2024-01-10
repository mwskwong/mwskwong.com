import {
  Output,
  email,
  literal,
  merge,
  minLength,
  object,
  optional,
  string,
  variant,
} from 'valibot';

const baseContactFormSchema = object({
  name: string([minLength(1, 'Please enter your name.')]),
  message: string([minLength(1, 'Please enter the message.')]),
});

export const contactFormSchema = variant('showInGuestbook', [
  merge([
    baseContactFormSchema,
    object({
      email: string([
        minLength(1, 'Please enter your email.'),
        email('Please enter a valid email.'),
      ]),
      subject: string([minLength(1, 'Please enter the subject.')]),
      showInGuestbook: literal(false),
    }),
  ]),
  merge([
    baseContactFormSchema,
    object({
      email: optional(string([email('Please enter a valid email.')]), ''),
      subject: optional(string(), ''),
      showInGuestbook: literal(true),
    }),
  ]),
]);

export type ContactFormData = Output<typeof contactFormSchema>;
