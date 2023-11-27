'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { prisma } from '@/lib/clients';

export const viewBlogById = (id: string) => {
  noStore();

  return prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
};
