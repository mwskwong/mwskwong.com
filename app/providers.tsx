"use client";

import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from "@mui/joy";
import { FC, PropsWithChildren } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import theme, { simpleIconsClasses } from "@/theme";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <>
    {getInitColorSchemeScript()}
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
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
            code: {
              fontFamily: theme.vars.fontFamily.code,
            },
            svg: {
              display: "block",
            },
            section: {
              paddingTop: "var(--Section-paddingY)",
              paddingBottom: "var(--Section-paddingY)",
            },
            footer: {
              paddingTop: "var(--Footer-paddingY)",
              paddingBottom: "var(--Footer-paddingY)",
            },
            address: {
              fontStyle: "unset",
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

export default Providers;
