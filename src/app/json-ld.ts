import { Organization } from 'schema-dts';

import { baseUrl } from '@/constants/base-url';
import {
  address,
  email,
  firstName,
  lastName,
  phone,
} from '@/constants/content';
import { getPlatformProfiles } from '@/lib/get-platform-profiles';

export const getOrganization = async () => {
  const platformProfiles = await getPlatformProfiles();

  return {
    '@id': baseUrl,
    '@type': 'Organization',
    name: `${firstName} ${lastName}`,
    telephone: phone,
    email,
    address,
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    image: `${baseUrl}/opengraph-image.png`,
    sameAs: platformProfiles.map(({ url }) => url),
  } satisfies Organization;
};
