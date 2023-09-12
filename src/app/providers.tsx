'use client';

import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { CssVarsProvider, getInitColorSchemeScript } from '@mui/joy/styles';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
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
        <ProgressBar
          color="var(--joy-palette-primary-plainColor)"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  </>
);
