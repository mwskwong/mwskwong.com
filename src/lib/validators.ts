import {
  type InferOutput,
  email,
  literal,
  nonEmpty,
  object,
  optional,
  pipe,
  string,
  union,
  variant,
} from 'valibot';

const BaseContactFormSchema = object({
  name: pipe(string(), nonEmpty('Name is required')),
  message: pipe(string(), nonEmpty('Message is required')),
});

export const ContactFormSchema = variant('showInGuestbook', [
  object({
    ...BaseContactFormSchema.entries,
    email: pipe(
      string(),
      nonEmpty('Email is required'),
      email('Not a valid email'),
    ),
    subject: pipe(string(), nonEmpty('Subject is required')),
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
