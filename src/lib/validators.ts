import {
  type InferOutput,
  email,
  literal,
  minLength,
  object,
  optional,
  pipe,
  string,
  union,
  variant,
} from 'valibot';

const BaseContactFormSchema = object({
  name: pipe(string(), minLength(1, 'Name is required')),
  message: pipe(string(), minLength(1, 'Message is required')),
});

export const ContactFormSchema = variant('showInGuestbook', [
  object({
    ...BaseContactFormSchema.entries,
    email: pipe(
      string(),
      minLength(1, 'Email is required'),
      email('Not a valid email'),
    ),
    subject: pipe(string(), minLength(1, 'Subject is required')),
    showInGuestbook: literal(false),
  }),
  object({
    ...BaseContactFormSchema.entries,
    email: union([
      optional(pipe(string(), email('Not a valid email'))),
      literal(''),
    ]),
    subject: optional(string()),
    showInGuestbook: literal(true),
  }),
]);

export type ContactFormData = InferOutput<typeof ContactFormSchema>;
