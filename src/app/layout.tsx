import './globals.css';

import { Theme } from '@radix-ui/themes';
import { type Metadata } from 'next';
import { Geist, Geist_Mono as GeistMono } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import { type FC, type PropsWithChildren } from 'react';

import { Header } from '@/components/header';
import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from '@/constants/me';
import { siteUrl } from '@/constants/site-config';
import { getPersonalPortrait } from '@/lib/queries';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: false,
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Theme>
            <Header />
            {children}
          </Theme>
        </body>
      </html>
    </ViewTransitions>
  );
};

const name = `${firstName} ${lastName}`;
export const generateMetadata = async () => {
  const { url: PersonalPortrait, contentType } = await getPersonalPortrait();

  const icon16 = new URL(PersonalPortrait ?? '');
  icon16.searchParams.set('fm', 'png');
  icon16.searchParams.set('w', '16');
  icon16.searchParams.set('h', '16');
  icon16.searchParams.set('r', 'max');

  const icon32 = new URL(PersonalPortrait ?? '');
  icon32.searchParams.set('fm', 'png');
  icon32.searchParams.set('w', '32');
  icon32.searchParams.set('h', '32');
  icon32.searchParams.set('r', 'max');

  const appleIcon = new URL(PersonalPortrait ?? '');
  appleIcon.searchParams.set('w', '180');
  appleIcon.searchParams.set('h', '180');

  return {
    title: {
      default: `${name} - ${headline}`,
      template: `%s | ${name}`,
    },
    description: selfIntroduction,
    authors: { name, url: siteUrl },
    metadataBase: new URL(siteUrl),
    openGraph: { url: '/', type: 'website' },
    robots: { 'max-image-preview': 'large' },
    icons: {
      icon: [
        { url: icon16.toString(), type: contentType, sizes: '16x16' },
        { url: icon32.toString(), type: contentType, sizes: '32x32' },
      ],
      apple: { url: appleIcon.toString(), type: contentType, sizes: '180x180' },
    },
    archives: ['https://v2.mwskwong.com', 'https://v3.mwskwong.com'],
    alternates: { canonical: '/' },
  } satisfies Metadata;
};

export default RootLayout;
