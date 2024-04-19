'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { type ErrorResponse } from 'resend';

import { Alert } from '@/components/emails/alert';
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

  contactForm.parse(data);
  await prisma.contactFormSubmission.create({ data });

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

export const sendAlertEmail = async (error: {
  digest?: string;
  message: string;
  stack?: string;
}) => {
  const severity = env.VERCEL_ENV === 'production' ? 'Major' : 'Minor';
  const ua = userAgent({ headers: headers() });

  const { error: errorResponse } = await resend.emails.send({
    from,
    to: email,
    subject:
      `[${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}] [Alert] [${severity}] ${error.message}`
        .replaceAll('\n', ' ')
        .replace(/\s+/g, ' '),
    react: <Alert {...error} userAgent={ua} />,
  });

  if (errorResponse) {
    throw new CreateEmailError(
      'Failed to send alert email when application error happened',
      errorResponse,
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

const from = `${firstName} ${lastName} <${email}>`;
