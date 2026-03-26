import "./globals.css";

import { cn } from "@heroui/styles";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

import {
  description,
  displayTitle,
  firstName,
  lastName,
  siteFqdn,
  siteName,
} from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${firstName} ${lastName} · ${displayTitle}`,
  description,
  metadataBase: new URL(`https://${siteFqdn}`),
  authors: { name: `${firstName} ${lastName}`, url: `https://${siteFqdn}` },
  openGraph: { siteName, url: "/", type: "website" },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    className={cn(geistSans.variable, geistMono.variable)}
    lang="en"
    suppressHydrationWarning
  >
    <body>
      <ThemeProvider>{children}</ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
