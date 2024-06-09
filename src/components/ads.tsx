'use client';

import { Card, type CardProps, styled } from '@mui/joy';
import { clsx } from 'clsx';
import { mergeSx } from 'merge-sx';
import { type ComponentProps, type FC, use, useEffect } from 'react';

import { AdsContext } from '@/lib/contexts';

declare global {
  interface Window {
    adsbygoogle?: {
      loaded: boolean;
      push: (args: Record<string, unknown>) => void;
    };
  }
}

const Ins = styled('ins')({ display: 'block' });
type InsProps = ComponentProps<typeof Ins>;

export type DisplayAdProps = InsProps;
export const DisplayAd: FC<DisplayAdProps> = ({ className, sx, ...props }) => {
  const { loaded } = use(AdsContext);
  useEffect(() => {
    if (loaded) {
      window.adsbygoogle?.push({});
    }
  }, [loaded]);

  return (
    <Ins
      className={clsx('adsbygoogle', className)}
      data-ad-client="ca-pub-4359361226572500"
      data-ad-slot="5863003404"
      data-full-width-responsive="false"
      sx={mergeSx({ mx: 'auto', width: '100%', height: 120 }, sx)}
      {...props}
    />
  );
};

export type BlogCardAdProps = CardProps;
export const BlogCardAd: FC<BlogCardAdProps> = ({ sx, ...props }) => {
  const { loaded } = use(AdsContext);
  useEffect(() => {
    if (loaded) {
      window.adsbygoogle?.push({});
    }
  }, [loaded]);

  return (
    <Card
      sx={mergeSx({ '--Card-padding': '0px', overflow: 'hidden' }, sx)}
      {...props}
    >
      <Ins
        className="adsbygoogle"
        data-ad-client="ca-pub-4359361226572500"
        data-ad-format="fluid"
        data-ad-layout-key="-5l+by-1h-32+t7"
        data-ad-slot="4179721808"
        sx={{ minHeight: 360, width: '100%' }}
      />
    </Card>
  );
};
