import { Feed } from 'feed';

import { email, firstName, lastName, middleName } from '@/constants/content';
import { routes, siteUrl } from '@/constants/site-config';
import { getBlogs } from '@/lib/queries';

export const dynamic = 'force-static';

const name = `${firstName} ${lastName}`;

export const GET = async () => {
  const blogs = await getBlogs();
  const blogFeed = new Feed({
    title: `${name} ${routes.blog.name}`,
    description: 'Personal perspectives on a broad range of topics.',
    id: siteUrl + routes.blogRssFeed.pathname,
    link: siteUrl + routes.blog.pathname,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} ${lastName.toUpperCase()}, ${firstName} ${middleName}`,
    feedLinks: {
      rss: siteUrl + routes.blogRssFeed.pathname,
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
      guid: `${siteUrl}${routes.blog.pathname}/${slug}`,
      title,
      link: `${siteUrl}${routes.blog.pathname}/${slug}`,
      description,
      author: [{ name, email }],
      published: new Date(createdAt),
      date: new Date(updatedAt),
      category: categories.map((category) => ({ name: category })),
    });
  }

  return new Response(blogFeed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  });
};
