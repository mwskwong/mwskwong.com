import { ImageLoader } from 'next/image';

export const contentfulLoader: ImageLoader = ({ src, width, quality = 75 }) => {
  const url = new URL(`https:${src}`);
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', quality.toString());
  return url.href;
};

export const thumIoPdfLoader: ImageLoader = ({ src, width }) =>
  `https://image.thum.io/get/pdfSource/width/${width}/https:${src}`;

export default contentfulLoader;
