import 'server-only';

import { PrismaClient } from '@prisma/client';
import { createClient } from 'contentful';
import { Resend } from 'resend';

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'production'
      ? undefined
      : ['query', 'info', 'warn', 'error'],
});

export const resend = new Resend(process.env.RESEND_API_KEY);
