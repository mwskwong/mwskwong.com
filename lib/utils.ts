import { Person } from 'schema-dts';

import { baseUrl } from '@/constants/base-url';
import {
  address,
  email,
  firstName,
  lastName,
  phone,
} from '@/constants/content';

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
    '@id': baseUrl,
    '@type': 'Person',
    name: `${firstName} ${lastName}`,
    telephone: phone,
    jobTitle: latestJobTitle,
    email,
    address,
    url: baseUrl,
    image: personalPhoto,
    sameAs: platformProfiles.map(({ url }) => url),
  } satisfies Person;
};
