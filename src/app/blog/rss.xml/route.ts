import { Feed } from 'feed';

import { email, firstName, lastName, legalName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import { getArticles } from '@/lib/queries';

const name = `${firstName} ${lastName}`;

export const GET = async () => {
  const blogs = await getArticles();
  const blogFeed = new Feed({
    title: `${name} ${routes.blog.name}`,
    description: 'Personal perspectives on a broad range of topics.',
    id: siteUrl + routes.blogRssFeed.pathname,
    link: siteUrl + routes.blog.pathname,
    language: 'en',
    copyright: `Copyright © ${new Date().getFullYear()} ${legalName}`,
    feedLinks: {
      rss: siteUrl + routes.blogRssFeed.pathname,
      atom: 'self',
    },
  });

  for (const { title, slug, description, createdAt, updatedAt } of blogs) {
    blogFeed.addItem({
      guid: `${siteUrl}${routes.blog.pathname}/${slug}`,
      title,
      link: `${siteUrl}${routes.blog.pathname}/${slug}`,
      description,
      author: [{ name, email }],
      published: createdAt,
      date: updatedAt,
    });
  }

  return new Response(blogFeed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  });
};
