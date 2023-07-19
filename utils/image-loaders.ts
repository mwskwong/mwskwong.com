import { ImageLoader } from "next/image";

export const contentfulLoader: ImageLoader = ({ src, quality, width }) => {
  const url = new URL(src);
  url.searchParams.set("fm", "webp");
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", (quality ?? 75).toString());
  return url.href;
};

export const thumIoPdfLoader: ImageLoader = ({ src, width }) =>
  `https://image.thum.io/get/pdfSource/width/${width}/${src}`;

export default contentfulLoader;
