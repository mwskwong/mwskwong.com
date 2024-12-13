import 'server-only';

import { createClient } from 'contentful';

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;
