"use client";

import {
  type CSSVariablesResolver,
  MantineProvider,
  type MantineProviderProps,
  createTheme,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], preload: false });

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  primaryColor: "teal",
  primaryShade: { light: 9, dark: 7 },
  respectReducedMotion: true,
});

const cssVariablesResolver: CSSVariablesResolver = ({
  primaryColor,
  primaryShade,
  colors,
}) => {
  const primaryShadeDark =
    typeof primaryShade === "number" ? primaryShade : primaryShade.dark;
  return {
    variables: {},
    light: {},
    dark: {
      "--mantine-color-body": colors.dark[9],
      "--mantine-color-teal-text": colors.teal[primaryShadeDark],
      "--mantine-color-anchor": colors[primaryColor][primaryShadeDark],
    },
  };
};

export type ThemeProviderProps = Omit<
  MantineProviderProps,
  "theme" | "cssVariablesResolver"
>;
export const ThemeProvider = (props: ThemeProviderProps) => (
  <MantineProvider
    cssVariablesResolver={cssVariablesResolver}
    theme={theme}
    {...props}
  />
);
