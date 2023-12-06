import { Entry } from 'contentful';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/clients';
import { BlogSkeleton } from '@/lib/types';

export const POST = async (request: NextRequest) => {
  const blog = (await request.json()) as Entry<BlogSkeleton>;
  const blogMetadata = await prisma.blogMetadata.upsert({
    where: { id: blog.sys.id },
    update: {},
    create: { id: blog.sys.id },
  });

  return NextResponse.json(blogMetadata);
};

export const DELETE = async (request: NextRequest) => {
  const blog = (await request.json()) as Entry<BlogSkeleton>;
  const blogMetadata = await prisma.blogMetadata.delete({
    where: { id: blog.sys.id },
  });

  return NextResponse.json(blogMetadata);
};
