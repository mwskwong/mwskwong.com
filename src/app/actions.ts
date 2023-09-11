'use server';

import { prisma } from '@/lib/db';

export const incrBlogView = (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });

export const likeBlog = (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { like: { increment: 1 } },
    create: { id },
  });

export const unlikeBlog = (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { like: { decrement: 1 } },
    create: { id },
  });
