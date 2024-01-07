export const home = { id: 'home', label: 'Home', pathname: '/' } as const;
export const about = { id: 'about', label: 'About', pathname: '/' } as const;
export const experience = {
  id: 'experience',
  label: 'Experience',
  pathname: '/',
} as const;
export const education = {
  id: 'education',
  label: 'Education',
  pathname: '/',
} as const;
export const contact = {
  id: 'contact',
  label: 'Contact',
  pathname: '/',
} as const;
export const blog = {
  id: undefined,
  label: 'Blog',
  pathname: '/blog',
} as const;
export const guestbook = {
  id: undefined,
  label: 'Guestbook',
  pathname: '/guestbook',
} as const;

export const nav = [about, experience, education, contact, blog, guestbook];
