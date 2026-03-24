"use client";

import "@mantine/core/styles.css";

import {
  type CSSVariablesResolver,
  type DefaultMantineColor,
  type MantineColorsTuple,
  MantineProvider,
  type MantineProviderProps,
  createTheme,
  virtualColor,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<
      "primary" | "caramel" | "wood" | DefaultMantineColor,
      MantineColorsTuple
    >;
  }
}

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], preload: false });

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  primaryColor: "primary",
  primaryShade: { light: 9, dark: 3 },
  colors: {
    primary: virtualColor({ name: "primary", light: "caramel", dark: "wood" }),
    caramel: [
      "#fef4e7",
      "#f1e8db",
      "#ddcfbd",
      "#c8b59b",
      "#b39977",
      "#ac906b",
      "#a78960",
      "#93754f",
      "#836843",
      "#735935",
    ],
    wood: [
      "#fff3e5",
      "#f9e5d4",
      "#eecaac",
      "#e0a472",
      "#da955b",
      "#d58543",
      "#d37d35",
      "#bb6b28",
      "#a75e20",
      "#925016",
    ],
  },
  respectReducedMotion: true,
});

const cssVariablesResolver: CSSVariablesResolver = (theme) => {
  const primaryShadeDark =
    typeof theme.primaryShade === "number"
      ? theme.primaryShade
      : theme.primaryShade.dark;

  return {
    variables: {},
    light: {},
    dark: {
      "--mantine-color-body": theme.colors.dark[9],
      "--mantine-color-primary-text":
        theme.colors[theme.primaryColor][primaryShadeDark],
      "--mantine-color-anchor":
        theme.colors[theme.primaryColor][primaryShadeDark],
    },
  };
};

export type ProvidersProps = Omit<
  MantineProviderProps,
  "theme" | "cssVariablesResolver"
>;
export const Providers = (props: ProvidersProps) => (
  <MantineProvider
    cssVariablesResolver={cssVariablesResolver}
    theme={theme}
    {...props}
  />
);
