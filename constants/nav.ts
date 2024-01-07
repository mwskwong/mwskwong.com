export const home = { id: 'home', name: 'Home', href: '/#' } as const;
export const about = { id: 'about', name: 'About', href: '/#about' } as const;
export const experience = {
  id: 'experience',
  name: 'Experience',
  href: '/#experience',
} as const;
export const education = {
  id: 'education',
  name: 'Education',
  href: '/#education',
} as const;
export const contact = {
  id: 'contact',
  name: 'Contact',
  href: '/#contact',
} as const;
export const blog = { id: undefined, name: 'Blog', href: '/blog' } as const;
export const guestbook = {
  id: undefined,
  name: 'Guestbook',
  href: '/guestbook',
} as const;

export const nav = [about, experience, education, contact, blog, guestbook];
