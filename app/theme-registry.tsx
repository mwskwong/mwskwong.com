"use client";

import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { CssVarsProvider, getInitColorSchemeScript } from "@mui/joy/styles";
import { FC, PropsWithChildren } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import theme, { globalStyles } from "@/theme";

const ThemeRegistry: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {getInitColorSchemeScript()}
      <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          {children}
        </CssVarsProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default ThemeRegistry;
