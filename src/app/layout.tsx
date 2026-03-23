import "./global.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";

import {
  description,
  displayTitle,
  firstName,
  lastName,
  siteFqdn,
  siteName,
} from "@/config";

import { Providers } from "./providers";

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
      <Providers defaultColorScheme="auto">{children}</Providers>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
