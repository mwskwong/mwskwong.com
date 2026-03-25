"use client";

import {
  type CSSVariablesResolver,
  type DefaultMantineColor,
  type MantineColorsTuple,
  MantineProvider,
  type MantineProviderProps,
  createTheme,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<"primary" | DefaultMantineColor, MantineColorsTuple>;
  }
}

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], preload: false });

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  primaryColor: "primary",
  primaryShade: { light: 7, dark: 5 },
  black: "#191818",
  white: "#F6F5F5",
  respectReducedMotion: true,
  colors: {
    // brown
    primary: [
      "#FAF6F0",
      "#F4E9DB",
      "#EDD9C4",
      "#E0C7AB",
      "#D0B28F",
      "#BA977D", //  main accent for dark mode
      "#A67F63",
      "#74492A", //  main accent for light mode
      "#5C3A23",
      "#3F2719",
    ],
    gray: [
      "#fdf2f6",
      "#eae6e8",
      "#cecdcd",
      "#b1b1b1",
      "#9a9a9a",
      "#8b8b8b",
      "#848383",
      "#747172",
      "#686365",
      "#5f5357",
    ],
  },
});

const cssVariablesResolver: CSSVariablesResolver = ({
  primaryColor,
  primaryShade,
  black,
  white,
  colors,
}) => {
  const primaryShadeDark =
    typeof primaryShade === "number" ? primaryShade : primaryShade.dark;

  return {
    variables: {},
    light: {
      "--mantine-color-dimmed": colors.gray[8],
    },
    dark: {
      "--mantine-color-body": black,
      "--mantine-color-text": white,
      "--mantine-color-dimmed": colors.gray[4],
      "--mantine-color-primary-text": colors[primaryColor][primaryShadeDark],
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
