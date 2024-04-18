'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { type ErrorResponse } from 'resend';
import { parse } from 'valibot';

import { ContactFormAcknowledgement } from '@/components/emails/contact-form-acknowledgement';
import { ContactFormNotification } from '@/components/emails/contact-form-notification';
import { email, firstName, lastName } from '@/constants/content';
import { env } from '@/env.mjs';
import { prisma, resend } from '@/lib/clients';

import { type ContactForm, contactForm } from './validation';

export const incrBlogViewById = async (id: string) => {
  noStore();
  await prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
};

export const submitContactForm = async (data: ContactForm) => {
  noStore();

  parse(contactForm, data);
  await prisma.contactFormSubmission.create({ data });

  const from = `${firstName} ${lastName} <${email}>`;
  const emails = [
    {
      from,
      to: email,
      subject: data.subject
        ? `[${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}] ${data.subject}`
        : `You got a message from ${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}`,
      react: <ContactFormNotification {...data} />,
    },
  ];

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
    super(message);
    this.error = error;
  }
}
