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

const Ins = styled('ins')();
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
      data-ad-format="auto"
      data-ad-slot="5863003404"
      data-full-width-responsive="true"
      sx={mergeSx(
        { display: 'inline-block', mx: 'auto', width: '100%', maxWidth: 'lg' },
        sx,
      )}
      {...props}
    />
  );
};

export type BlogCardAdProps = CardProps;
export const BlogCardAd: FC<BlogCardAdProps> = ({
  className,
  sx,
  ...props
}) => {
  const { loaded } = use(AdsContext);
  useEffect(() => {
    if (loaded) {
      window.adsbygoogle?.push({});
    }
  }, [loaded]);

  return (
    <Card
      className={clsx('adsbygoogle', className)}
      component="ins"
      data-ad-client="ca-pub-4359361226572500"
      data-ad-format="fluid"
      data-ad-layout-key="-65+bw+q+5+eo"
      data-ad-slot="4179721808"
      sx={mergeSx({ '--Card-padding': '0px', minHeight: 50 }, sx)}
      {...props}
    />
  );
};
