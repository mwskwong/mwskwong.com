import { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const getFonts = async () =>
  [
    {
      name: 'Geist Sans',
      data: await fetch(
        new URL(
          'geist/assets/fonts/geist-sans/Geist-Bold.ttf',
          import.meta.url,
        ),
      ).then((res) => res.arrayBuffer()),
      weight: 700,
      style: 'normal',
    },
  ] satisfies SatoriOptions['fonts'];
