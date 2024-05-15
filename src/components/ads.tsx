'use client';

import { Card, type CardProps, styled } from '@mui/joy';
import { clsx } from 'clsx';
import { mergeSx } from 'merge-sx';
import { type ComponentProps, type FC } from 'react';

import { env } from '@/env.mjs';

const Ins = styled('ins')();
type InsProps = ComponentProps<typeof Ins>;

export type DisplayAdProps = InsProps;
export const DisplayAd: FC<DisplayAdProps> = ({ className, sx, ...props }) => (
  <Ins
    className={clsx('adsbygoogle', className)}
    data-ad-client="ca-pub-4359361226572500"
    data-ad-format="auto"
    data-ad-slot="5863003404"
    data-adtest={env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? undefined : 'on'}
    data-full-width-responsive="true"
    sx={mergeSx({ display: 'block', mx: 'auto' }, sx)}
    {...props}
  />
);

export type BlogCardAdProps = CardProps;
export const BlogCardAd: FC<BlogCardAdProps> = ({ className, ...props }) => (
  <Card
    className={clsx('adsbygoogle', className)}
    component="ins"
    data-ad-client="ca-pub-4359361226572500"
    data-ad-format="fluid"
    data-ad-layout-key="-65+bw+q+5+eo"
    data-ad-slot="4179721808"
    data-adtest={env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? undefined : 'on'}
    {...props}
  />
);
