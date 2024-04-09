import { Person } from 'schema-dts';

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

export const getJsonLdPerson = async () => {
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

export const encodeHtmlEntities = (str: string) =>
  str.replace(/[\u00A0-\u9999<>&]/gim, (i) => `&#${i.charCodeAt(0)};`);
