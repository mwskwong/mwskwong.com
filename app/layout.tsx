import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Person, WithContext } from "schema-dts";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionDivider from "@/components/section-divider";
import { linkedin } from "@/constants/contentful-ids";
import {
  address,
  email,
  firstName,
  jobTitles,
  lastName,
  middleName,
  phone,
  selfIntroduction,
} from "@/constants/data";
import { getPersonalPhoto, getPlatformProfiles } from "@/lib";

import ThemeRegistry from "./theme-registry";

const RootLayout = async ({ children }: PropsWithChildren) => {
  const platformProfiles = await getPlatformProfiles();
  const personalPhoto = await getPersonalPhoto();
  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${firstName} ${lastName}`,
    givenName: firstName,
    additionalName: middleName,
    familyName: lastName,
    nationality: "Chinese",
    address,
    jobTitle: jobTitles.join(" & "),
    email,
    telephone: phone,
    url: process.env.NEXT_PUBLIC_URL,
    sameAs: platformProfiles.map(({ url }) => url),
    image: personalPhoto,
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
          <SectionDivider sx={{ bgcolor: "background.level1" }} />
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
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
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default RootLayout;
