'use server';

import { type ErrorResponse } from 'resend';

import { ContactFormAcknowledgement } from '@/components/emails/contact-form-acknowledgement';
import { ContactFormNotification } from '@/components/emails/contact-form-notification';
import { email, firstName, lastName } from '@/constants/content';
import { env } from '@/env';
import { prisma, resend } from '@/lib/clients';

import { type ContactForm, contactForm } from './validators';

export const incrBlogViewById = async (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });

export const submitContactForm = async (data: ContactForm) => {
  contactForm.parse(data);
  await prisma.contactFormSubmission.create({ data });

  const from = `${firstName} ${lastName} <${email}>`;
  const emails = [
    {
      from,
      to: email,
      reply_to: data.email,
      subject: data.subject
        ? `[${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}] ${data.subject}`
        : `You got a message from ${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}`,
      react: <ContactFormNotification {...data} />,
    },
  ] as Parameters<typeof resend.batch.send>[0];

  if (data.email) {
    emails.push({
      from,
      to: data.email,
      subject: `Got Your Message From ${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}!`,
      react: <ContactFormAcknowledgement {...data} />,
    });
  }

  const { error } = await resend.batch.send(emails);
  if (error) {
    throw new CreateEmailError(
      'Failed to send emails on contact form submission',
      error,
    );
  }
};

class CreateEmailError extends Error {
  error: ErrorResponse;

  constructor(message: string, error: ErrorResponse) {
    super(`${message}\n${JSON.stringify(error, null, 2)}`);
    this.name = 'CreateEmailError';
    this.error = error;
  }
}
