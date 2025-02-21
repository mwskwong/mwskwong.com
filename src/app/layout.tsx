import "./globals.css";

import { Theme } from "@radix-ui/themes/components/theme";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { type Metadata } from "next";
import { type Icon } from "next/dist/lib/metadata/types/metadata-types";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import { type FC, type PropsWithChildren } from "react";

import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from "@/constants/me";
import { siteName, siteUrl } from "@/constants/site-config";
import { getPersonalPortrait } from "@/lib/queries";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: false,
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={clsx(
        geist.variable,
        geistMono.variable,
        ibmPlexSerif.variable,
      )}
    >
      <Theme>{children}</Theme>
      <Analytics
        mode={
          process.env.VERCEL_ENV === "production" ? "production" : "development"
        }
      />
      <SpeedInsights />
    </body>
  </html>
);

const name = `${firstName} ${lastName}`;
const iconSizes = [16, 32, 48, 192, 512];
const generateIcon = async (size: number, rounded = false) => {
  const personalPortrait = await getPersonalPortrait();
  const icon = new URL(personalPortrait ?? "");
  icon.searchParams.set("fm", "png");
  icon.searchParams.set("w", String(size));
  icon.searchParams.set("h", String(size));
  icon.searchParams.set("fit", "fill");

  if (rounded) {
    icon.searchParams.set("r", "max");
  }

  return { url: icon.toString(), type: "image/png" } satisfies Icon;
};

export const generateMetadata = async () =>
  ({
    title: {
      default: `${name} - ${headline}`,
      template: `%s | ${name}`,
    },
    description: selfIntroduction,
    authors: { name, url: siteUrl },
    metadataBase: new URL(siteUrl),
    openGraph: {
      url: "/",
      type: "website",
      siteName,
    },
    icons: {
      icon: await Promise.all(
        iconSizes.map(async (size) => {
          const icon = await generateIcon(size, true);
          return { ...icon, sizes: `${size}x${size}` };
        }),
      ),
      apple: { ...(await generateIcon(180)), sizes: "180x180" },
    },
    archives: ["https://v2.mwskwong.com", "https://v3.mwskwong.com"],
  }) satisfies Metadata;

export default RootLayout;
