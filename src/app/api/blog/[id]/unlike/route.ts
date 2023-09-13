import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { contentful } from '@/lib/client';
import { prisma } from '@/lib/db';
import { BlogSkeleton } from '@/lib/types';

export const POST = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  const metadata = await prisma.blogMetadata.upsert({
    where: { id },
    update: { like: { decrement: 1 } },
    create: { id },
  });

  const { fields } = await contentful.getEntry<BlogSkeleton>(id);
  revalidatePath(`/blog/${fields.slug}`);

  return NextResponse.json(metadata);
};
