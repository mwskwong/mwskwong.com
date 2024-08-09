import { capitalize } from 'lodash-es';

export const siteUrl = (() => {
  const localUrl = `http://localhost:${process.env.PORT ?? 3000}`;
  if (!process.env.VERCEL) return localUrl;

  const previewDeploymentHostname =
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;
  const previewDeploymentUrl = previewDeploymentHostname
    ? `https://${previewDeploymentHostname}`
    : undefined;
  if (
    process.env.NODE_ENV === 'production' &&
    previewDeploymentUrl &&
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  ) {
    return previewDeploymentUrl;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
})();

export const siteDisplayName = capitalize(
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
);

export interface Route {
  name: string;
  pathname: string;
  hash?: string;
}

export const routes = {
  home: { name: 'Home', pathname: '/' } as Route,
  about: { name: 'About', pathname: '/', hash: 'about' } as Route,
  experience: {
    name: 'Experience',
    pathname: '/',
    hash: 'experience',
  } as Route,
  education: {
    name: 'Education',
    pathname: '/',
    hash: 'education',
  } as Route,
  contact: { name: 'Contact', pathname: '/', hash: 'contact' } as Route,
  contactForm: {
    name: 'Contact Form',
    pathname: '/',
    hash: 'contactForm',
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
