'use server';

import { send } from '@emailjs/nodejs';
import { unstable_noStore as noStore } from 'next/cache';
import { parse } from 'valibot';

import { db } from '@/lib/clients';

import { ContactForm, contactForm } from './validation-schema';

export const incrBlogViewById = async (id: string) => {
  noStore();
  await db.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
};

export const submitContactForm = async (data: ContactForm) => {
  noStore();
  parse(contactForm, data);
  await db.contactFormSubmission.create({ data });
  await send(
    process.env.EMAILJS_SERVICE_ID ?? '',
    process.env.EMAILJS_CONTACT_FORM_TEMPLATE_ID ?? '',
    data,
    {
      publicKey: process.env.EMAILJS_PUBLIC_KEY ?? '',
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    },
  );
};
