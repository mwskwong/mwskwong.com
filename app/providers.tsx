'use client';

import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from '@mui/joy';
import { FC, PropsWithChildren } from 'react';

import { globalStyles, theme } from '@/theme';

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => (
  <>
    {getInitColorSchemeScript()}
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </CssVarsProvider>
  </>
);
