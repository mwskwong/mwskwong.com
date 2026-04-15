import "./globals.css";

import { cn } from "@heroui/styles";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Domine, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import {
  description,
  firstName,
  headline,
  lastName,
  siteName,
  siteUrl,
} from "@/config";

const domine = Domine({
  variable: "--font-variable",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
    className={cn(domine.variable, inter.variable)}
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
