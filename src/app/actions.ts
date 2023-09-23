'use server';

import { revalidatePath } from 'next/cache';

import { contentful } from '@/lib/client';
import { prisma } from '@/lib/db';
import { BlogSkeleton } from '@/lib/types';

export const likeBlogById = async (id: string) => {
  const metadata = await prisma.blogMetadata.upsert({
    where: { id },
    update: { like: { increment: 1 } },
    create: { id },
  });

  const { fields } = await contentful.getEntry<BlogSkeleton>(id);
  revalidatePath(`/blog/${fields.slug}`);

  return metadata;
};

export const unlikeBlogById = async (id: string) => {
  const metadata = await prisma.blogMetadata.upsert({
    where: { id },
    update: { like: { decrement: 1 } },
    create: { id },
  });

  const { fields } = await contentful.getEntry<BlogSkeleton>(id);
  revalidatePath(`/blog/${fields.slug}`);

  return metadata;
};

export const viewBlogById = async (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
