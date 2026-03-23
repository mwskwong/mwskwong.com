"use client";

import {
  type DefaultMantineColor,
  type MantineColorsTuple,
  createTheme,
  virtualColor,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<
      "primary" | "walnut" | "birch" | DefaultMantineColor,
      MantineColorsTuple
    >;
  }
}

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], preload: false });

export const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  primaryColor: "primary",
  primaryShade: { light: 8, dark: 5 },
  colors: {
    primary: virtualColor({ name: "primary", dark: "walnut", light: "birch" }),
    birch: [
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
    walnut: [
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
