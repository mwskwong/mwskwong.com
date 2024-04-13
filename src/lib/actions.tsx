'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { parse } from 'valibot';

import { ContactFormAcknowledgement } from '@/components/emails/contact-form-acknowledgement';
import { ContactFormNotification } from '@/components/emails/contact-form-notification';
import { email, firstName, lastName } from '@/constants/content';
import { websiteDisplayName } from '@/constants/site-config';
import { prisma, resend } from '@/lib/clients';

import { ContactForm, contactForm } from './validation-schema';

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

  const from = `${firstName} ${lastName} <contact@mwskwong.com>`;
  await Promise.all([
    data.email &&
      resend.emails.send({
        from,
        to: data.email,
        reply_to: email,
        subject: `Got Your Message From ${websiteDisplayName}!`,
        react: <ContactFormAcknowledgement {...data} />,
      }),
    resend.emails.send({
      from,
      to: email,
      subject: data.subject
        ? `[${websiteDisplayName}] ${data.subject}`
        : `You got a message from ${websiteDisplayName}`,
      react: <ContactFormNotification {...data} />,
    }),
  ]);
};
