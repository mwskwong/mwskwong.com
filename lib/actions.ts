'use server';

import { send } from '@emailjs/nodejs';
import { unstable_noStore as noStore } from 'next/cache';
import { parse } from 'valibot';

import { env } from '@/env.mjs';
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
    env.EMAILJS_SERVICE_ID,
    env.EMAILJS_CONTACT_FORM_TEMPLATE_ID,
    data,
    { publicKey: env.EMAILJS_PUBLIC_KEY, privateKey: env.EMAILJS_PRIVATE_KEY },
  );
};
