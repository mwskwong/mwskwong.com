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
} from '@/lib/queries';

export const getPerson = async () => {
  const latestJobTitle = (await getExperiences())[0]?.jobTitle;
  const personalPhoto = await getPersonalPhoto();
  const platformProfiles = await getPlatformProfiles();

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
