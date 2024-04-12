import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from '@/constants/content';
import { baseUrl } from '@/constants/site-config';

import { Providers } from './providers';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // data-joy-color-scheme is dynamically injected, suppressing the hydration warning in this case
  <html suppressHydrationWarning lang="en">
    <body>
      <Providers>{children}</Providers>
      <Analytics
        mode={
          process.env.VERCEL_ENV === 'production' ? 'production' : 'development'
        }
      />
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
  robots: { 'max-image-preview': 'large' },
  archives: ['https://v2.mwskwong.com'],
  alternates: { canonical: '/' },
} satisfies Metadata;

export default RootLayout;
