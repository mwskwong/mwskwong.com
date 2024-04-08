import { capitalize } from 'lodash-es';

import { env } from '@/env.mjs';

export const baseUrl = env.NEXT_PUBLIC_VERCEL_ENV
  ? `https://${
      env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? env.NEXT_PUBLIC_PROD_URL
        : env.NEXT_PUBLIC_VERCEL_URL ?? ''
    }`
  : 'http://localhost:3000';

export const websiteDisplayName = capitalize(env.NEXT_PUBLIC_PROD_URL);
