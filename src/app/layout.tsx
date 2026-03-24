import "@mantine/core/styles.css";
import "./global.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import {
  type DefaultMantineColor,
  type MantineColorsTuple,
  MantineProvider,
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
    colors: Record<"primary" | DefaultMantineColor, MantineColorsTuple>;
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
    // camel
    primary: [
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
