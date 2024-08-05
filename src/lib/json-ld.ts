import { type Person } from 'schema-dts';

import {
  address,
  email,
  firstName,
  lastName,
  phone,
  selfIntroduction,
} from '@/constants/content';

import {
  getExperiences,
  getPersonalPhoto,
  getSocialMediaProfiles,
} from './queries';

export const getPerson = async () => {
  const [latestJobTitle, personalPhoto, socialMediaProfiles] =
    await Promise.all([
      getExperiences().then((experience) => experience[0]?.jobTitle),
      getPersonalPhoto(),
      getSocialMediaProfiles(),
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
    url: process.env.NEXT_PUBLIC_SITE_URL,
    image: personalPhoto,
    sameAs: socialMediaProfiles.map(({ url }) => url),
    description: selfIntroduction,
  } satisfies Person;
};
