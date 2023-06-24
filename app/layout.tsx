import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Metadata } from "next";
import { Rubik, Source_Code_Pro } from "next/font/google";
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

import Providers from "./providers";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const RootLayout = async ({ children }: PropsWithChildren) => {
  const platformProfiles = await getPlatformProfiles();
  return (
    <html lang="en" className={clsx(rubik.variable, sourceCodePro.variable)}>
      <body>
        <Providers>
          <Header
            platformProfiles={platformProfiles.filter(
              ({ platform }) => platform?.id !== linkedin
            )}
          />
          {children}
          <SectionDivider sx={{ bgcolor: "background.level1" }} />
          <Footer />
        </Providers>
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
  // TODO: change to mwskwong.com when push to PROD
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
};

export default RootLayout;
