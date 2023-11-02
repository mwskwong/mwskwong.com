import { Organization } from 'schema-dts';

import { baseUrl } from '@/constants/base-url';
import { email, firstName, lastName, phone } from '@/constants/content';
import { getPlatformProfiles } from '@/lib/get-platform-profiles';

export const getOrganization = async () => {
  const platformProfiles = await getPlatformProfiles();

  return {
    '@id': baseUrl,
    '@type': 'Organization',
    name: `${firstName} ${lastName}`,
    telephone: phone,
    email,
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    sameAs: platformProfiles.map(({ url }) => url),
  } satisfies Organization;
};
