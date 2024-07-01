'use client';

import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { type FC, type PropsWithChildren } from 'react';

import { globalStyles, theme } from '@/theme';

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => (
  <>
    <InitColorSchemeScript />
    <AppRouterCacheProvider options={{ key: 'joy' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        {children}
      </CssVarsProvider>
    </AppRouterCacheProvider>
  </>
);
