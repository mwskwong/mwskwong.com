import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Rubik, Source_Code_Pro } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionDivider from "@/components/section-divider";
import {
  firstName,
  jobTitles,
  lastName,
  selfIntroduction,
} from "@/constants/data";

import Providers from "./providers";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={`${rubik.variable} ${sourceCodePro.variable}`}>
    <body>
      <Providers>
        <Header />
        {children}
        <SectionDivider sx={{ bgcolor: "background.level1" }} />
        <Footer />
      </Providers>
      <Analytics />
    </body>
  </html>
);

const fullName = `${firstName} ${lastName}`;
const title: Metadata["title"] = {
  default: `${fullName} - ${jobTitles.join(" & ")}`,
  template: `%s | ${fullName}`,
};
const description = selfIntroduction;

export const metadata: Metadata = {
  title,
  description,
  authors: { name: `${firstName} ${lastName}` },
  metadataBase: process.env.NEXT_PUBLIC_URL
    ? new URL(process.env.NEXT_PUBLIC_URL)
    : undefined,
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#ffffff",
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default RootLayout;
