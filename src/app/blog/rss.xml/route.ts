import { Feed } from 'feed';

import { email, firstName, lastName, middleName } from '@/constants/content';
import { blog, blogRssFeed } from '@/constants/nav';
import { env } from '@/env.mjs';
import { getBlogs } from '@/lib/queries';

export const GET = async () => {
  const blogs = await getBlogs();
  const blogFeed = new Feed({
    title: `${firstName} ${lastName} ${blog.label}`,
    description: 'Personal perspectives on a broad range of topics.',
    id: env.NEXT_PUBLIC_SITE_URL + blogRssFeed.pathname,
    link: env.NEXT_PUBLIC_SITE_URL + blogRssFeed.pathname,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} ${lastName.toUpperCase()}, ${firstName} ${middleName}`,
    feedLinks: {
      rss: env.NEXT_PUBLIC_SITE_URL + blogRssFeed.pathname,
      atom: 'self',
    },
  });

  for (const {
    title,
    slug,
    description,
    categories = [],
    createdAt,
    updatedAt,
  } of blogs) {
    blogFeed.addItem({
      guid: `${env.NEXT_PUBLIC_SITE_URL}${blog.pathname}/${slug}`,
      title,
      link: `${env.NEXT_PUBLIC_SITE_URL}${blog.pathname}/${slug}`,
      description,
      author: [
        {
          name: `${firstName} ${lastName}`,
          email,
        },
      ],
      published: new Date(createdAt),
      date: new Date(updatedAt),
      category: categories.map((category) => ({ name: category })),
    });
  }

  return new Response(blogFeed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  });
};
