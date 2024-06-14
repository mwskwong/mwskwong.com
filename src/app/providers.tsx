'use client';

import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from '@mui/joy';
// FIXME: switch to @mui/joy-nextjs when ready
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { type FC, type PropsWithChildren } from 'react';

import { globalStyles, theme } from '@/theme';

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => (
  <AppRouterCacheProvider options={{ key: 'joy' }}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {getInitColorSchemeScript()}
      {children}
    </CssVarsProvider>
  </AppRouterCacheProvider>
);
