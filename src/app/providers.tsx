'use client';

// import createCache, { Options } from '@emotion/cache';
// import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { CssVarsProvider, getInitColorSchemeScript } from '@mui/joy/styles';
// import { useServerInsertedHTML } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { globalStyles, theme } from '@/theme';

/**
 * @see {@link https://mui.com/joy-ui/integrations/next-js-app-router/}
 */
// const useEmotionAppRouterCompat = (options: Options) => {
//   const cache = createCache(options);
//   cache.compat = true;
//   // eslint-disable-next-line @typescript-eslint/unbound-method -- Emotion App Router compatibility setup
//   const prevInsert = cache.insert;
//   let inserted: string[] = [];
//   cache.insert = (...args) => {
//     const serialized = args[1];
//     if (cache.inserted[serialized.name] === undefined) {
//       inserted.push(serialized.name);
//     }
//     return prevInsert(...args);
//   };

//   const flush = () => {
//     const prevInserted = inserted;
//     inserted = [];
//     return prevInserted;
//   };

//   useServerInsertedHTML(() => {
//     const names = flush();
//     if (names.length === 0) {
//       return null;
//     }
//     let styles = '';
//     for (const name of names) {
//       styles += cache.inserted[name];
//     }
//     return (
//       <style
//         dangerouslySetInnerHTML={{
//           __html: styles,
//         }}
//         data-emotion={`${cache.key} ${names.join(' ')}`}
//         key={cache.key}
//       />
//     );
//   });

//   return cache;
// };

export type ProvidersProps = PropsWithChildren;
export const Providers: FC<ProvidersProps> = ({ children }) => {
  // Not using usual Emotion setup here because this causes hydration error
  // const cache = useEmotionAppRouterCompat({ key: 'joy' });
  return (
    <>
      {getInitColorSchemeScript()}
      {/* <CacheProvider value={cache}> */}
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        {children}
      </CssVarsProvider>
      {/* </CacheProvider> */}
    </>
  );
};
