import {
  EmailRounded,
  LocationOnRounded,
  SmartphoneRounded,
} from '@mui/icons-material';

import { Contentful } from '@/components/icons/contentful';
import { Formspree } from '@/components/icons/formspree';
import { ImprovMx } from '@/components/icons/improvmx';
import { Mui } from '@/components/icons/mui';
import { NextJs } from '@/components/icons/nextjs';
import { PlanetScale } from '@/components/icons/planetscale';
import { Prisma } from '@/components/icons/prisma';
import { React } from '@/components/icons/react';
import { ReactHookForm } from '@/components/icons/react-hook-form';
import { TypeScript } from '@/components/icons/typescript';
import { Vercel } from '@/components/icons/vercel';
import { Zod } from '@/components/icons/zod';

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
    Icon: React,
    url: 'https://react.dev/',
  },
  {
    name: 'Next.js App Router',
    Icon: NextJs,
    url: 'https://nextjs.org/',
  },
  {
    name: 'TypeScript',
    Icon: TypeScript,
    url: 'https://www.typescriptlang.org/',
  },
  {
    name: 'MUI Joy UI',
    Icon: Mui,
    // TODO: change this to https://mui.com/joy-ui once the marking page is done
    // Issue: https://github.com/mui/material-ui/pull/36829
    url: 'https://mui.com/',
  },
  {
    name: 'React Hook Form',
    Icon: ReactHookForm,
    url: 'https://react-hook-form.com/',
  },
  {
    name: 'Zod',
    Icon: Zod,
    url: 'https://zod.dev/',
  },
  {
    name: 'Prisma',
    Icon: Prisma,
    url: 'https://www.prisma.io/',
  },
  {
    name: 'PlanetScale',
    Icon: PlanetScale,
    url: 'https://planetscale.com/',
  },
  {
    name: 'Vercel',
    Icon: Vercel,
    url: 'https://vercel.com/',
  },
  {
    name: 'Contentful',
    Icon: Contentful,
    url: 'https://www.contentful.com/',
  },
  {
    name: 'Formspree',
    Icon: Formspree,
    url: 'https://formspree.io/',
  },
  {
    name: 'ImprovMX',
    Icon: ImprovMx,
    url: 'https://improvmx.com/',
  },
];

export const contactInfo = [
  {
    Icon: SmartphoneRounded,
    title: 'Call Me At',
    value: phone,
    url: `tel:${phone.replaceAll(' ', '')}`,
  },
  {
    Icon: EmailRounded,
    title: 'Email Me At',
    value: email,
    url: `mailto:${email}`,
  },
  {
    Icon: LocationOnRounded,
    title: 'Find Me At',
    value: address,
    url: 'https://www.google.com/maps/place/Hong+Kong',
  },
];
