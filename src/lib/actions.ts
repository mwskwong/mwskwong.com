'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { prisma } from '@/lib/clients';

export const incrBlogViewById = (id: string) => {
  noStore();

  return prisma.blogMetadata.update({
    where: { id },
    data: { view: { increment: 1 } },
  });
};
