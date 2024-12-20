import './globals.css';

import { Theme } from '@radix-ui/themes';
import { type Metadata } from 'next';
import {
  Noto_Sans as NotoSans,
  Noto_Sans_Mono as NotoSansMono,
  Noto_Serif as NotoSerif,
} from 'next/font/google';
import { type FC, type PropsWithChildren } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from '@/constants/me';
import { siteUrl } from '@/constants/site-config';
import { getPersonalPortrait } from '@/lib/queries';
import { cn } from '@/lib/utils';

const notoSans = NotoSans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const notoSansMono = NotoSansMono({
  variable: '--font-noto-sans-mono',
  subsets: ['latin'],
  preload: false,
});

const notoSerif = NotoSerif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  preload: false,
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={cn(
        notoSans.variable,
        notoSerif.variable,
        notoSansMono.variable,
      )}
    >
      <Theme>
        <Header />
        {children}
        <Footer />
      </Theme>
    </body>
  </html>
);

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
  } satisfies Metadata;
};

export default RootLayout;
