import "@mantine/core/styles.css";
import "./global.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import {
  type DefaultMantineColor,
  type MantineColorsTuple,
  createTheme,
} from "@mantine/core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import {
  description,
  displayTitle,
  firstName,
  lastName,
  siteFqdn,
  siteName,
} from "@/config";

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

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  primaryColor: "primary",
  primaryShade: { light: 9, dark: 4 },
  colors: {
    // wood accent
    primary: [
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

export const metadata: Metadata = {
  title: `${firstName} ${lastName} · ${displayTitle}`,
  description,
  metadataBase: new URL(`https://${siteFqdn}`),
  authors: { name: `${firstName} ${lastName}`, url: `https://${siteFqdn}` },
  openGraph: { siteName, url: "/", type: "website" },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>
    <body>
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        {children}
      </MantineProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
