import 'server-only';

import { PrismaClient } from '@prisma/client';
import { createClient } from 'contentful';
import { Resend } from 'resend';

import { env } from '@/env';

export const contentful = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  environment: env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;

export const prisma = new PrismaClient({
  log:
    env.NODE_ENV === 'production'
      ? undefined
      : ['query', 'info', 'warn', 'error'],
});

export const resend = new Resend(env.RESEND_API_KEY);
