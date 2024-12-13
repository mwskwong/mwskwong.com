import { type UrlObject } from 'node:url';

export interface Route extends UrlObject {
  name: string;
  pathname: string;
}

export const routes = {
  home: { name: 'Home', pathname: '/' } as Route,
  experience: {
    name: 'Experience',
    pathname: '/experience',
  } as Route,
  education: {
    name: 'Education',
    pathname: '/education',
  } as Route,
  blog: { name: 'Blog', pathname: '/blog' } as Route,
  blogRssFeed: {
    name: 'Blog RSS Feed',
    pathname: '/blog/rss.xml',
  } as Route,
  guestbook: { name: 'Guestbook', pathname: '/guestbook' } as Route,
  privacyPolicy: {
    name: 'Privacy Policy',
    pathname: '/privacy-policy',
  } as Route,
};

const getSiteUrl = () => {
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' &&
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV &&
    process.env.NEXT_PUBLIC_VERCEL_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const siteUrl = getSiteUrl();
