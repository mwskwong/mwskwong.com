'use client';

import Link, { LinkProps } from '@mui/joy/Link';
import NextLink from 'next/link';
import { FC } from 'react';

import AppIcon from '@/app/icon.svg';
import { home } from '@/constants/nav';

export type NavBrandProps = Omit<LinkProps, 'children'>;
export const NavBrand: FC<NavBrandProps> = (props) => (
  <Link
    aria-label="Go to home page"
    component={NextLink}
    href={home.href}
    {...props}
  >
    <AppIcon width={32} />
  </Link>
);
