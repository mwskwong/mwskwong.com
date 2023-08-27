import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionDivider from "@/components/section-divider";
import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from "@/constants/content";
import { linkedin } from "@/constants/contentful-ids";
import getPlatformProfiles from "@/lib/get-platform-profiles";

import ThemeRegistry from "./theme-registry";

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const platformProfiles = await getPlatformProfiles();

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header
            platformProfiles={platformProfiles.filter(
              ({ platform }) => platform?.id !== linkedin,
            )}
          />
          {children}
          <SectionDivider bgcolor="background.level1" />
          <Footer />
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
};

const name = `${firstName} ${lastName}`;
const title: Metadata["title"] = {
  default: `${name} - ${headline}`,
  template: `%s | ${name}`,
};
const path = "/";

export const metadata: Metadata = {
  title,
  description: selfIntroduction,
  authors: { name, url: process.env.NEXT_PUBLIC_URL },
  metadataBase: process.env.NEXT_PUBLIC_URL
    ? new URL(process.env.NEXT_PUBLIC_URL)
    : undefined,
  openGraph: {
    title,
    description: selfIntroduction,
    url: path,
    type: "website",
  },
  alternates: { canonical: path },
  archives: ["https://v2.mwskwong.com"],
};

export default RootLayout;
