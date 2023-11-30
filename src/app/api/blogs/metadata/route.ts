import { Entry } from 'contentful';
import { headers } from 'next/headers';

import { prisma } from '@/lib/clients';
import { BlogSkeleton } from '@/lib/types';

export const POST = async (request: Request) => {
  const token = headers().get('Authorization')?.split('Bearer ')[1];

  if (token === process.env.INIT_BLOG_METADATA_TOKEN) {
    const blog = (await request.json()) as Entry<BlogSkeleton>;
    // eslint-disable-next-line no-console -- debug
    console.error(blog);
    const blogMetadata = await prisma.blogMetadata.upsert({
      where: { id: blog.sys.id },
      update: {},
      create: { id: blog.sys.id },
    });

    return Response.json(blogMetadata);
  }

  return Response.json(null, { status: 401 });
};
