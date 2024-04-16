import { capitalize } from 'lodash-es';

export const baseUrl = `https://${
  (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.NEXT_PUBLIC_PROD_URL) ?? 'localhost:3000'
}`;

export const websiteDisplayName = capitalize(process.env.NEXT_PUBLIC_PROD_URL);