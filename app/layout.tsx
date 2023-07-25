import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionDivider from "@/components/section-divider";
import { linkedin } from "@/constants/contentful-ids";
import {
  firstName,
  jobTitles,
  lastName,
  selfIntroduction,
} from "@/constants/data";
import { getPlatformProfiles } from "@/lib";

import ThemeRegistry from "./theme-registry";

const RootLayout = async ({ children }: PropsWithChildren) => {
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
          <SectionDivider sx={{ bgcolor: "background.level1" }} />
          <Footer />
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
};

const name = `${firstName} ${lastName}`;
const title: Metadata["title"] = {
  default: `${name} - ${jobTitles.join(" & ")}`,
  template: `%s | ${name}`,
};
const description = selfIntroduction;

export const metadata: Metadata = {
  title,
  description,
  authors: { name },
  metadataBase: process.env.NEXT_PUBLIC_URL
    ? new URL(process.env.NEXT_PUBLIC_URL)
    : undefined,
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
  },
  themeColor: "#ffffff",
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default RootLayout;
