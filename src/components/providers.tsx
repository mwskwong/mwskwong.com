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
      "primary" | "lightWood" | "darkWood" | DefaultMantineColor,
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
    primary: virtualColor({
      name: "primary",
      light: "darkWood",
      dark: "lightWood",
    }),
    lightWood: [
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
    darkWood: [
      "#fff1e9",
      "#f5e3da",
      "#e3c6b8",
      "#d2a792",
      "#c38d71",
      "#bb7c5d",
      "#b56f4c",
      "#a16141",
      "#915638",
      "#80482c",
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
