import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
// eslint-disable-next-line camelcase -- Next.js naming convention
import { unstable_cache } from 'next/cache';
import { FC, PropsWithChildren } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from '@/constants/content';
import { linkedin } from '@/constants/contentful-ids';
import { platformProfileTags } from '@/lib/cache-tags';
import { getPlatformProfiles } from '@/lib/get-platform-profiles';
import { baseUrl } from '@/utils/base-url';

import { ThemeRegistry } from './theme-registry';

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const platformProfiles = await unstable_cache(getPlatformProfiles, [], {
    tags: platformProfileTags.lists(),
  })();

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header
            platformProfiles={platformProfiles.filter(
              ({ platform }) => platform?.id !== linkedin,
            )}
          />
          {children}
          <Footer />
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
};

const name = `${firstName} ${lastName}`;
const title: Metadata['title'] = {
  default: `${name} - ${headline}`,
  template: `%s | ${name}`,
};
const path = '/';

export const metadata: Metadata = {
  title,
  description: selfIntroduction,
  authors: { name, url: baseUrl },
  metadataBase: new URL(baseUrl),
  openGraph: {
    title,
    description: selfIntroduction,
    url: path,
    type: 'website',
  },
  alternates: { canonical: path },
  archives: ['https://v2.mwskwong.com'],
};

export default RootLayout;
