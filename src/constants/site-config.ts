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

export const github = 'https://github.com/mwskwong';
export const linkedin = 'https://www.linkedin.com/in/mwskwong/';
