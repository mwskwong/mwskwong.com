'use server';

import { type CreateBatchOptions } from 'resend';
import { parse } from 'valibot';

import { ContactFormAcknowledgement } from '@/components/emails/contact-form-acknowledgement';
import { ContactFormNotification } from '@/components/emails/contact-form-notification';
import { email, firstName, lastName } from '@/constants/content';
import { siteDisplayName } from '@/constants/site-config';
import { prisma, resend } from '@/lib/clients';

import { type ContactFormData, ContactFormSchema } from './validators';

export const incrBlogViewById = async (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });

export const submitContactForm = async (data: ContactFormData) => {
  parse(ContactFormSchema, data);
  await prisma.contactFormSubmission.create({ data });

  const from = `${firstName} ${lastName} <${email}>`;
  const emails = [
    {
      from,
      to: email,
      replyTo: data.email,
      subject: data.subject
        ? `[${siteDisplayName}] ${data.subject}`
        : `You got a message from ${siteDisplayName}`,
      react: <ContactFormNotification {...data} />,
    },
  ] as CreateBatchOptions;

  if (data.email) {
    emails.push({
      from,
      to: data.email,
      subject: `Got Your Message From ${siteDisplayName}!`,
      react: <ContactFormAcknowledgement {...data} />,
    });
  }

  const { error } = await resend.batch.send(emails);
  if (error) {
    throw new Error(
      `Failed to send emails on contact form submission\n${JSON.stringify(error, null, 2)}`,
    );
  }
};
