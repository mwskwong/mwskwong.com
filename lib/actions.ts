'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cache } from 'react';

import { prisma } from '@/lib/clients';

export const incrBlogViewById = cache(async (id: string) => {
  noStore();
  await prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
});
