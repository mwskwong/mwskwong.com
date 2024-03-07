'use server';

import { send } from '@emailjs/nodejs';
import { sql } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';
import { parse } from 'valibot';

import { blogMetadata, contactFormSubmission } from '@/db/schema';
import { db } from '@/lib/clients';

import { ContactFormData, contactFormSchema } from './schemas';

export const incrBlogViewById = async (id: string) => {
  noStore();
  await db
    .insert(blogMetadata)
    .values({ id, view: 1 })
    .onConflictDoUpdate({
      target: blogMetadata.id,
      set: { view: sql`${blogMetadata.view} + 1` },
    });
};

export const submitContactForm = async (data: ContactFormData) => {
  noStore();
  parse(contactFormSchema, data);
  await db.insert(contactFormSubmission).values(data);
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
