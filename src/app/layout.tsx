import "./globals.css";

import { Theme } from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Geist, Geist_Mono as GeistMono } from "next/font/google";
import { type FC, type PropsWithChildren } from "react";

import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from "@/constants/me";
import { siteUrl } from "@/constants/site-config";
import { getPersonalPortrait } from "@/lib/queries";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={`${geist.variable} ${geistMono.variable}`}>
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
export const generateMetadata = async () => {
  const { url: personalPortrait, contentType } = await getPersonalPortrait();

  const icon16 = new URL(personalPortrait ?? "");
  icon16.searchParams.set("fm", "png");
  icon16.searchParams.set("w", "16");
  icon16.searchParams.set("h", "16");
  icon16.searchParams.set("r", "max");

  const icon32 = new URL(personalPortrait ?? "");
  icon32.searchParams.set("fm", "png");
  icon32.searchParams.set("w", "32");
  icon32.searchParams.set("h", "32");
  icon32.searchParams.set("r", "max");

  const appleIcon = new URL(personalPortrait ?? "");
  icon32.searchParams.set("fm", "png");
  appleIcon.searchParams.set("w", "180");
  appleIcon.searchParams.set("h", "180");

  return {
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
      siteName: name,
    },
    robots: { "max-image-preview": "large" },
    icons: {
      icon: [
        { url: icon16.toString(), type: contentType, sizes: "16x16" },
        { url: icon32.toString(), type: contentType, sizes: "32x32" },
      ],
      apple: { url: appleIcon.toString(), type: contentType, sizes: "180x180" },
    },
    archives: ["https://v2.mwskwong.com", "https://v3.mwskwong.com"],
  } satisfies Metadata;
};

export default RootLayout;
