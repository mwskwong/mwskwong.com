"use client";

import {
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
  getInitColorSchemeScript,
} from "@mui/joy";
import { FC, PropsWithChildren } from "react";

import theme, { simpleIconsClasses } from "@/theme";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <>
    {getInitColorSchemeScript()}
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Section-paddingY": theme.spacing(10),
            "--Footer-paddingY": theme.spacing(6),
            "--Section-scrollPaddingTop": 64,
          },
          "::selection": {
            backgroundColor: theme.vars.palette.primary.solidBg,
            color: theme.vars.palette.primary.solidColor,
          },
          svg: {
            display: "block",
          },
          section: {
            paddingTop: "var(--Section-paddingY)",
            paddingBottom: "var(--Section-paddingY)",
            scrollPaddingTop: "var(--Section-scrollPaddingTop)",
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
            width: "0.83em",
            height: "0.83em",
          },
        })}
      />
      {children}
    </CssVarsProvider>
  </>
);

export default Providers;
