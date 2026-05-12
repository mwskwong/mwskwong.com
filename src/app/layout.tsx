import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import {
  description,
  firstName,
  headline,
  lastName,
  siteName,
  siteUrl,
} from "@/config";

const ubuntuSansBolder = localFont({
  src: [
    {
      path: "../assets/UbuntuSansBolder-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/UbuntuSansBolder-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/UbuntuSansBolder-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu-sans-bolder",
});

export const metadata: Metadata = {
  title: `${firstName} ${lastName} · ${headline}`,
  description,
  metadataBase: siteUrl,
  authors: { name: `${firstName} ${lastName}`, url: siteUrl },
  openGraph: { siteName, url: "/", type: "website" },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    className={ubuntuSansBolder.variable}
    lang="en"
    suppressHydrationWarning
  >
    <body>
      <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
