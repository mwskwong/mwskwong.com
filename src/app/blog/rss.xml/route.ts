import { Feed } from 'feed';

import { email, firstName, lastName, legalName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import { getArticles } from '@/lib/queries';

const name = `${firstName} ${lastName}`;

export const GET = async () => {
  const articles = await getArticles();
  const feed = new Feed({
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

  for (const { title, slug, description, updatedAt } of articles) {
    feed.addItem({
      guid: `${siteUrl}${routes.blog.pathname}/${slug}`,
      title,
      link: `${siteUrl}${routes.blog.pathname}/${slug}`,
      description,
      author: [{ name, email }],
      published: new Date(updatedAt),
      date: new Date(updatedAt),
    });
  }

  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  });
};
