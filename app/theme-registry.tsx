"use client";

import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from "@mui/joy";
import { FC, PropsWithChildren } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import theme from "@/theme";
import { simpleIconsClasses } from "@/theme/classes";

const ThemeRegistry: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {getInitColorSchemeScript()}
      <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
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
                fontStyle: "italic",
                "&::before": { content: "'“'" },
                "&::after": { content: "'”'" },
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
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default ThemeRegistry;
