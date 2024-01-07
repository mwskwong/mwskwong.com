import { Person } from 'schema-dts';
import { z } from 'zod';

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

export const contactFormSchema = z.discriminatedUnion('showInGuestBook', [
  z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Email should be an email'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
    showInGuestBook: z.literal(false),
  }),
  z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email should be an email').optional(),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
    showInGuestBook: z.literal(true),
  }),
]);
export type ContactFormSchema = z.infer<typeof contactFormSchema>;
