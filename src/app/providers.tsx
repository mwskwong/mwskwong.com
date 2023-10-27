'use client';

import { NoSsr } from '@mui/base';
import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from '@mui/joy';
import { AppProgressBar as NProgressBar } from 'next-nprogress-bar';
import { FC, PropsWithChildren } from 'react';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

import { globalStyles, theme } from '@/theme';

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => (
  <>
    {getInitColorSchemeScript()}
    <NextAppDirEmotionCacheProvider options={{ key: 'joy' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <NoSsr defer>
          <NProgressBar
            color="var(--joy-palette-primary-plainColor)"
            delay={100}
            height="var(--NProgress-height)"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </NoSsr>
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  </>
);
