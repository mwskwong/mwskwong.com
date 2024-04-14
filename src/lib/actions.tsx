'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { ErrorResponse } from 'resend';
import { parse } from 'valibot';

import { ContactFormAcknowledgement } from '@/components/emails/contact-form-acknowledgement';
import { ContactFormNotification } from '@/components/emails/contact-form-notification';
import { email, firstName, lastName } from '@/constants/content';
import { websiteDisplayName } from '@/constants/site-config';
import { prisma, resend } from '@/lib/clients';

import { ContactForm, contactForm } from './validation-schema';

class CreateEmailError extends Error {
  error: ErrorResponse;

  constructor(message: string, error: ErrorResponse) {
    super(message);
    this.error = error;
  }
}

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
  await Promise.all([
    data.email &&
      resend.emails
        .send({
          from,
          to: data.email,
          subject: `Got Your Message From ${websiteDisplayName}!`,
          react: <ContactFormAcknowledgement {...data} />,
        })
        .then(({ error }) => {
          if (error) {
            throw new CreateEmailError(
              'Failed to auto reply user through email on contact form submission',
              error,
            );
          }
        }),
    resend.emails
      .send({
        from,
        to: email,
        subject: data.subject
          ? `[${websiteDisplayName}] ${data.subject}`
          : `You got a message from ${websiteDisplayName}`,
        react: <ContactFormNotification {...data} />,
      })
      .then(({ error }) => {
        if (error) {
          throw new CreateEmailError(
            'Failed to notify site owner through email on contact form submission',
            error,
          );
        }
      }),
  ]);
};
