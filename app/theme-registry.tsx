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
            })}
          />
          {children}
        </CssVarsProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default ThemeRegistry;
