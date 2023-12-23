'use client';

import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { CssVarsProvider, getInitColorSchemeScript } from '@mui/joy/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';

import { globalStyles, theme } from '@/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => (
  <>
    {getInitColorSchemeScript()}
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CssVarsProvider>
  </>
);
