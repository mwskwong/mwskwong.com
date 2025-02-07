import { type UrlObject } from "node:url";

import { firstName, lastName, middleName } from "./me";

export interface Route extends UrlObject {
  name: string;
  pathname: string;
}

export const routes = {
  home: { name: `${firstName} ${lastName}`, pathname: "/" },
  experience: { name: "Experience", pathname: "/experience" },
  education: { name: "Education", pathname: "/education" },
  skills: { name: "Skills", pathname: "/skills" },
  blog: { name: "Blog", pathname: "/blog" },
  blogRssFeed: { name: "Blog RSS Feed", pathname: "/blog/rss.xml" },
  params: { name: "Parameters", pathname: "/_params" },
} as const satisfies Record<string, Route>;

const getSiteUrl = () => {
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" &&
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" &&
    process.env.NEXT_PUBLIC_VERCEL_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const siteUrl = getSiteUrl();
export const siteName = `${firstName} ${middleName
  .split(" ")
  .map((word) => word.charAt(0) + ".")
  .join("")} ${lastName}`;
export const alternateSiteNames = [
  `${firstName} ${lastName}`,
  "mwskwong",
  `${firstName.charAt(0)}${lastName.charAt(0)}`,
];

// extract from Radix Themes
export const sm = 768;
export const md = 1024;
export const containerMaxWidth = 1136;
