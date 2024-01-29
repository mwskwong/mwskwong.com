import { Person } from 'schema-dts';
import sharp from 'sharp';

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
    url: `https://${process.env.NEXT_PUBLIC_PROD_URL}`,
    image: personalPhoto,
    sameAs: platformProfiles.map(({ url }) => url),
    description: selfIntroduction,
  } satisfies Person;
};

export const encodeHtmlEntities = (str: string) =>
  str.replace(/[\u00A0-\u9999<>&]/gim, (i) => `&#${i.charCodeAt(0)};`);

/**
 * @see {@link https://github.com/vercel/next.js/blob/canary/examples/image-component/app/color/page.tsx}
 */
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/* eslint-disable no-bitwise -- copied code */
const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
/* eslint-enable -- copied code */

export const dominateColorDataURL = async (remoteImgUrl: string) => {
  const imgBuffer = await fetch(remoteImgUrl).then((res) => res.arrayBuffer());
  const { dominant } = await sharp(imgBuffer).stats();
  const { r, g, b } = dominant;

  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
};
