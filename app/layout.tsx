import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { Article, WithContext } from "schema-dts";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionDivider from "@/components/section-divider";
import {
  firstName,
  jobTitle,
  lastName,
  selfIntroduction,
} from "@/constants/content";
import { linkedin } from "@/constants/contentful-ids";
import getPlatformProfiles from "@/lib/get-platform-profiles";

import ThemeRegistry from "./theme-registry";

const name = `${firstName} ${lastName}`;
const title: Metadata["title"] = {
  default: `${name} - ${jobTitle}`,
  template: `%s | ${name}`,
};
const description = selfIntroduction;

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const platformProfiles = await getPlatformProfiles();
  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title.default,
    image: `${process.env.NEXT_PUBLIC_URL}/opengraph-image.png`,
    datePublished: new Date("2019-07-15").toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": process.env.NEXT_PUBLIC_URL,
    },
    author: {
      "@type": "Person",
      name,
      url: process.env.NEXT_PUBLIC_URL,
      jobTitle,
    },
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
};

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
  alternates: { canonical: "/" },
  archives: ["https://v2.mwskwong.com"],
};

export default RootLayout;
