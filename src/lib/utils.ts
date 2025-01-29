import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

export const generatePdfThumbnail = (url: string, width = 16 * 12 * 4) =>
  `https://image.thum.io/get/pdfSource/width/${width}/page/1/${url}`;

export const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export const cache: typeof nextCache = (callback, keyParts, options) =>
  reactCache(
    nextCache(callback, keyParts, { revalidate: 60 * 60, ...options }),
  );
