import { MetadataRoute } from "next";

import { firstName, lastName, selfIntroduction } from "@/constants/content";

export const runtime = "edge";

const manifest = (): MetadataRoute.Manifest => ({
  name: `${firstName} ${lastName}`,
  short_name: firstName,
  description: selfIntroduction,
  start_url: "/",
  display: "standalone",
  icons: [
    // @ts-expect-error the purpose field is valid
    { src: "icon.svg", sizes: "any", purpose: "any monochrome" },
    { src: "apple-icon.png", sizes: "1024x1024", purpose: "maskable" },
  ],
});

export default manifest;
