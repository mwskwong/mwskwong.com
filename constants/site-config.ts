import capitalize from 'lodash/capitalize';

export const baseUrl = `https://${
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.NEXT_PUBLIC_PROD_URL
}`;

export const websiteDisplayName = capitalize(process.env.NEXT_PUBLIC_PROD_URL);
