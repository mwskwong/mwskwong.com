"use client";

import createCache, { Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from "@mui/joy";
import { useServerInsertedHTML } from "next/navigation";
import { FC, PropsWithChildren, useState } from "react";

import theme from "@/theme";
import { simpleIconsClasses } from "@/theme/classes";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
const ThemeRegistry: FC<PropsWithChildren<{ options: Options }>> = ({
  options,
  children,
}) => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <>
      {getInitColorSchemeScript()}
      <CacheProvider value={cache}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              ":root": {
                "--Section-paddingY": theme.spacing(10),
                "--Footer-paddingY": theme.spacing(6),
              },
              "::selection": {
                backgroundColor: theme.vars.palette.primary.solidBg,
                color: theme.vars.palette.primary.solidColor,
              },
              address: {
                fontStyle: "unset",
              },
              blockquote: {
                margin: 0,
              },
              code: {
                fontFamily: theme.vars.fontFamily.code,
              },
              figure: {
                margin: 0,
              },
              footer: {
                paddingBlock: "var(--Footer-paddingY)",
              },
              section: {
                paddingBlock: "var(--Section-paddingY)",
              },
              svg: {
                display: "block",
              },
              [`.${simpleIconsClasses.root}`]: {
                color: "var(--Icon-color)",
                margin: "var(--Icon-margin)",
                fontSize: "var(--Icon-fontSize, 20px)",
                padding: "0.083em", // 2 / 24; Material icons standard, leaving 2dp padding around a 24dp icon.
                width: "1em",
                height: "1em",
              },
            })}
          />
          {children}
        </CssVarsProvider>
      </CacheProvider>
    </>
  );
};

export default ThemeRegistry;
