'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cache } from 'react';

import { prisma } from '@/lib/clients';

export const incrBlogViewById = cache(async (id: string) => {
  noStore();
  const blogMetadata = await prisma.blogMetadata.update({
    where: { id },
    data: { view: { increment: 1 } },
  });

  return blogMetadata;
});

export const likeBlog = async (visitorId: string, blogId: string) => {
  noStore();
  const like = await prisma.like.create({ data: { visitorId, blogId } });

  return like;
};

export const unlikeBlog = async (visitorId: string, blogId: string) => {
  noStore();
  const like = await prisma.like.delete({
    where: { visitorId_blogId: { visitorId, blogId } },
  });

  return like;
};
