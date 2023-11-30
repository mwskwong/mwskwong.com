import { Entry } from 'contentful';

import { authorized } from '@/app/api/authorized';
import { prisma } from '@/lib/clients';
import { BlogSkeleton } from '@/lib/types';

export const POST = async (request: Request) => {
  if (authorized()) {
    const blog = (await request.json()) as Entry<BlogSkeleton>;
    const blogMetadata = await prisma.blogMetadata.upsert({
      where: { id: blog.sys.id },
      update: {},
      create: { id: blog.sys.id },
    });

    return Response.json(blogMetadata);
  }

  return Response.json(null, { status: 401 });
};

export const DELETE = async (request: Request) => {
  if (authorized()) {
    const blog = (await request.json()) as Entry<BlogSkeleton>;
    const blogMetadata = await prisma.blogMetadata.delete({
      where: { id: blog.sys.id },
    });

    return Response.json(blogMetadata);
  }

  return Response.json(null, { status: 401 });
};
