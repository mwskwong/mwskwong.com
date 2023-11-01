import {
  SiContentful,
  SiImprovmx,
  SiMui,
  SiNextdotjs,
  SiPlanetscale,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiTypescript,
  SiVercel,
  SiZod,
} from '@icons-pack/react-simple-icons';
import { Mail, MapPin, Smartphone } from 'lucide-react';

import { SiFormspree } from '@/components/icons/si-formspree';

export const phone = '+852 6095 4241';
export const email = 'contact@mwskwong.com';
export const address = 'Hong Kong';
export const contact = { phone, email, address };

export const headline = 'Senior Web Engineer @ Viu';

export const firstName = 'Matthew';
export const middleName = 'Wang Shun';
export const lastName = 'Kwong';
export const name = { firstName, middleName, lastName };

export const selfIntroduction =
  'Dynamic and experienced Web Engineer. Skilled in web development, database management, analytical thinking, and creative problem-solving. Adaptable team player with the ability to work independently and an eagerness to succeed.';

export const websiteTechStack = [
  {
    name: 'React',
    Icon: SiReact,
    url: 'https://react.dev/',
  },
  {
    name: 'Next.js App Router',
    Icon: SiNextdotjs,
    url: 'https://nextjs.org/',
  },
  {
    name: 'TypeScript',
    Icon: SiTypescript,
    url: 'https://www.typescriptlang.org/',
  },
  {
    name: 'MUI Joy UI',
    Icon: SiMui,
    // TODO: change this to https://mui.com/joy-ui once the marking page is done
    // Issue: https://github.com/mui/material-ui/pull/36829
    url: 'https://mui.com/',
  },
  {
    name: 'React Hook Form',
    Icon: SiReacthookform,
    url: 'https://react-hook-form.com/',
  },
  {
    name: 'Zod',
    Icon: SiZod,
    url: 'https://zod.dev/',
  },
  {
    name: 'Prisma',
    Icon: SiPrisma,
    url: 'https://www.prisma.io/',
  },
  {
    name: 'PlanetScale',
    Icon: SiPlanetscale,
    url: 'https://planetscale.com/',
  },
  {
    name: 'Vercel',
    Icon: SiVercel,
    url: 'https://vercel.com/',
  },
  {
    name: 'Contentful',
    Icon: SiContentful,
    url: 'https://www.contentful.com/',
  },
  {
    name: 'Formspree',
    Icon: SiFormspree,
    url: 'https://formspree.io/',
  },
  {
    name: 'ImprovMX',
    Icon: SiImprovmx,
    url: 'https://improvmx.com/',
  },
];

export const contactInfo = [
  {
    Icon: Smartphone,
    title: 'Call Me At',
    value: phone,
    url: `tel:${phone.replaceAll(' ', '')}`,
  },
  {
    Icon: Mail,
    title: 'Email Me At',
    value: email,
    url: `mailto:${email}`,
  },
  {
    Icon: MapPin,
    title: 'Find Me At',
    value: address,
    url: 'https://www.google.com/maps/place/Hong+Kong',
  },
];
