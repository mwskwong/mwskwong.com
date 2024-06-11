'use client';

import { NoSsr } from '@mui/base';
import { Card, type CardProps, styled, useColorScheme } from '@mui/joy';
import { clsx } from 'clsx';
import { mergeSx } from 'merge-sx';
import { type ComponentProps, type FC, use, useEffect } from 'react';

import { env } from '@/env.mjs';
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
      data-ad-client={env.NEXT_PUBLIC_AD_SENSE_PUBLISHER_ID}
      data-ad-slot="5863003404"
      data-full-width-responsive="false"
      sx={mergeSx({ width: '100%', height: 120 }, sx)}
      {...props}
    />
  );
};

export type BlogCardAdProps = CardProps;
export const BlogCardAd: FC<BlogCardAdProps> = ({ sx, ...props }) => {
  const { loaded } = use(AdsContext);
  const { mode } = useColorScheme();
  useEffect(() => {
    if (loaded && mode) {
      window.adsbygoogle?.push({});
    }
  }, [loaded, mode]);

  return (
    <Card
      sx={mergeSx({ '--Card-padding': '0px', overflow: 'hidden' }, sx)}
      {...props}
    >
      <NoSsr>
        <Ins
          className="adsbygoogle"
          data-ad-client={env.NEXT_PUBLIC_AD_SENSE_PUBLISHER_ID}
          data-ad-format="fluid"
          data-ad-layout-key="-5l+by-1h-32+t7"
          data-ad-slot={mode === 'dark' ? '3821089578' : '4179721808'}
          sx={{ height: 360, width: '100%' }}
        />
      </NoSsr>
    </Card>
  );
};

export type InArticleAdProps = InsProps;
export const InArticleAd: FC<InArticleAdProps> = ({
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
    <Ins
      className={clsx('adsbygoogle', className)}
      data-ad-client={env.NEXT_PUBLIC_AD_SENSE_PUBLISHER_ID}
      data-ad-format="fluid"
      data-ad-layout="in-article"
      data-ad-slot="6207205061"
      sx={mergeSx({ textAlign: 'center', width: '100%' }, sx)}
      {...props}
    />
  );
};

export type MultiplexAdProps = InsProps;
export const MultiplexAd: FC<MultiplexAdProps> = ({
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
    <Ins
      className={clsx('adsbygoogle', className)}
      data-ad-client={env.NEXT_PUBLIC_AD_SENSE_PUBLISHER_ID}
      data-ad-format="autorelaxed"
      data-ad-slot="1224961804"
      sx={mergeSx({ width: '100%' }, sx)}
      {...props}
    />
  );
};
