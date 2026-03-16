import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import {
  currentRole,
  displayTitle,
  firstName,
  lastName,
  siteFqdn,
  siteName,
} from "@/config";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], preload: false });

const theme = createTheme({
  fontFamily: geist.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  primaryColor: "teal",
  primaryShade: { light: 9, dark: 5 },
  respectReducedMotion: true,
});

export const metadata: Metadata = {
  title: `${firstName} ${lastName} · ${displayTitle}`,
  description: `Tech Lead & Full Stack Web Developer at ${currentRole.company.name} working on eWin. Transitioned from System DBA to building visual, user-friendly web applications that ordinary people can understand. Polite, straight to the point, and driven by solving meaningful problems that create real impact.`,
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
