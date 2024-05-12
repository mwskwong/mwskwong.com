'use client';

import { styled } from '@mui/joy';
import { clsx } from 'clsx';
import { mergeSx } from 'merge-sx';
import { type ComponentProps, type FC } from 'react';

import { env } from '@/env.mjs';

const Ins = styled('ins')();

export type DisplayAdProps = ComponentProps<typeof Ins>;
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
