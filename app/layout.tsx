import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { baseUrl } from '@/constants/base-url';
import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from '@/constants/content';

import { Providers } from './providers';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>
      <Providers>{children}</Providers>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

const name = `${firstName} ${lastName}`;
export const metadata = {
  title: {
    default: `${name} - ${headline}`,
    template: `%s | ${name}`,
  },
  description: selfIntroduction,
  authors: { name, url: baseUrl },
  metadataBase: new URL(baseUrl),
  openGraph: { url: '/', type: 'website' },
  archives: ['https://v2.mwskwong.com'],
} satisfies Metadata;

export default RootLayout;