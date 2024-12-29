'use server';

import { prisma } from './clients';

export const incrementArticleView = async (id: string) =>
  await prisma.articleMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
