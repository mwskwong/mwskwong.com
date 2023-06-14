"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import { FC, PropsWithChildren } from "react";

import theme from "@/theme";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CacheProvider>
    <ChakraProvider theme={theme}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ChakraProvider>
  </CacheProvider>
);

export default Providers;
