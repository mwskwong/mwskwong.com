"use client";

import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { MotionConfig } from "framer-motion";
import { FC, PropsWithChildren } from "react";

import theme from "@/theme";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </CssVarsProvider>
);

export default Providers;
