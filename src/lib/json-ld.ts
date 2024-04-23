import { type Person, type WebSite } from 'schema-dts';

import {
  address,
  email,
  firstName,
  lastName,
  phone,
  selfIntroduction,
} from '@/constants/content';
import { env } from '@/env.mjs';

import {
  getExperiences,
  getPersonalPhoto,
  getPlatformProfiles,
} from './queries';

export const getPerson = async () => {
  const [latestJobTitle, personalPhoto, platformProfiles] = await Promise.all([
    getExperiences().then((experience) => experience[0]?.jobTitle),
    getPersonalPhoto(),
    getPlatformProfiles(),
  ]);

  return {
    '@id': 'mwskwong',
    '@type': 'Person',
    name: `${firstName} ${lastName}`,
    alternateName: 'mwskwong',
    telephone: phone,
    jobTitle: latestJobTitle,
    email,
    address,
    url: env.NEXT_PUBLIC_SITE_URL,
    image: personalPhoto,
    sameAs: platformProfiles.map(({ url }) => url),
    description: selfIntroduction,
  } satisfies Person;
};

export const webSite = {
  '@type': 'WebSite',
  name: `${firstName} ${lastName}`,
  alternateName: ['mwskwong', 'MK'],
  url: env.NEXT_PUBLIC_SITE_URL,
} satisfies WebSite;
