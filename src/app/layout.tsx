import "./globals.css";

import { cn } from "@heroui/styles";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Fugaz_One, Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import {
  description,
  firstName,
  headline,
  lastName,
  siteName,
  siteUrl,
} from "@/config";

const fugazOne = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: "400"
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
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
    className={cn(fugazOne.variable, workSans.variable)}
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
