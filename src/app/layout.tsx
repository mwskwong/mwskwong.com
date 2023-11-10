import { Analytics } from '@vercel/analytics/react';
// importing these in client component will result in an error, so we cannot do that in theme.ts
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
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
  <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
    <body>
      <Providers>{children}</Providers>
      <Analytics
        mode={
          process.env.VERCEL_ENV === 'production' ? 'production' : 'development'
        }
      />
    </body>
  </html>
);

const name = `${firstName} ${lastName}`;
export const metadata: Metadata = {
  title: {
    default: `${name} - ${headline}`,
    template: `%s | ${name}`,
  },
  description: selfIntroduction,
  authors: { name, url: baseUrl },
  metadataBase: new URL(baseUrl),
  openGraph: { url: '/', type: 'website' },
  archives: ['https://v2.mwskwong.com'],
};

export default RootLayout;
