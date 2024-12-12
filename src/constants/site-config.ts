import { type UrlObject } from 'node:url';

export interface Route extends UrlObject {
  name: string;
  pathname: string;
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

export const github = 'https://github.com/mwskwong';
export const linkedin = 'https://www.linkedin.com/in/mwskwong/';
