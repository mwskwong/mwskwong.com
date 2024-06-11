'use client';

import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from '@mui/joy';
// FIXME: switch to @mui/joy-nextjs when ready
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Script from 'next/script';
import { type FC, type PropsWithChildren, useState } from 'react';

import { env } from '@/env.mjs';
import { AdsContext } from '@/lib/contexts';
import { globalStyles, theme } from '@/theme';

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => {
  const [adsLoaded, setAdsLoaded] = useState(false);

  return (
    <>
      {getInitColorSchemeScript()}
      <AppRouterCacheProvider options={{ key: 'joy' }}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          <AdsContext value={{ loaded: adsLoaded }}>{children}</AdsContext>
        </CssVarsProvider>
      </AppRouterCacheProvider>
      <Script
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_AD_SENSE_PUBLISHER_ID}`}
        strategy="lazyOnload"
        onLoad={() => setAdsLoaded(true)}
      />
    </>
  );
};
