'use server';

import { send } from '@emailjs/nodejs';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { parse } from 'valibot';

import { blog as blogNav } from '@/constants/nav';
import { prisma } from '@/lib/clients';

import { getBlogById } from './queries';
import { ContactFormData, contactFormSchema } from './schemas';

export const incrBlogViewById = async (id: string) => {
  noStore();
  await prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
};

export const submitContactForm = async (data: ContactFormData) => {
  noStore();
  parse(contactFormSchema, data);
  await prisma.contactFormSubmission.create({ data });
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

export const likeBlog = async (blogId: string, userId?: string) => {
  let _userId = userId;
  if (!_userId) {
    const cookieStore = cookies();
    _userId = crypto.randomUUID();
    cookieStore.set('userId', _userId, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
    });
  }

  await prisma.blogLike.create({ data: { blogId, userId: _userId } });
  const blog = await getBlogById(blogId);
  revalidatePath(`${blogNav.pathname}/${blog.slug}`);
};

export const unlikeBlog = async (blogId: string, userId?: string) => {
  noStore();
  if (userId) {
    await prisma.blogLike.delete({
      where: { blogId_userId: { blogId, userId } },
    });
    const blog = await getBlogById(blogId);
    revalidatePath(`${blogNav.pathname}/${blog.slug}`);
  }
};
