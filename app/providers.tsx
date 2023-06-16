"use client";

import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy";
import { MotionConfig } from "framer-motion";
import { FC, PropsWithChildren } from "react";

import theme, { simpleIconsClasses } from "@/theme";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={(theme) => ({
        ":root": {
          "--Section-paddingY": theme.spacing(5),
          "--Section-scrollPaddingTop": 64,
        },
        svg: {
          display: "block",
        },
        section: {
          paddingTop: "var(--Section-paddingY)",
          paddingBottom: "var(--Section-paddingY)",
          scrollPaddingTop: "var(--Section-scrollPaddingTop)",
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
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </CssVarsProvider>
);

export default Providers;
