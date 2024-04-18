// @ts-check
// Using .mjs because this will be used in next.config.mjs

import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { capitalize } from 'lodash-es';
// FIXME: switch to Valibot when @t3-oss/env-nextjs has it implemented
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.string().url(),
    CONTENTFUL_ENVIRONMENT: (() => {
      switch (process.env.VERCEL_ENV) {
        case 'production':
          return z.literal('master');
        case 'preview':
          return (
            z
              .string()
              // matching canary_YYYY-MM-DDTHH.mm.ss.SSSS
              .regex(/^canary_\d{4}-\d{2}-\d{2}T\d{2}\.\d{2}\.\d{2}\.\d{4}$/)
          );
        default:
          return z.literal('development');
      }
    })(),
    CONTENTFUL_SPACE_ID: z.string(),
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    RESEND_API_KEY: z.string().startsWith('re_'),
    ANALYZE: z
      .enum(['true', 'false'])
      .transform((analyze) => analyze === 'true')
      .optional(),
    CRON_SECRET:
      process.env.VERCEL === '1' ? z.string() : z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_DISPLAY_NAME: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_VERCEL_ENV
      ? process.env.NEXT_PUBLIC_PROD_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL &&
        `https://${
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_URL
            : process.env.NEXT_PUBLIC_VERCEL_URL
        }`
      : 'http://localhost:3000',
    NEXT_PUBLIC_SITE_DISPLAY_NAME:
      process.env.NEXT_PUBLIC_PROD_URL &&
      capitalize(process.env.NEXT_PUBLIC_PROD_URL),
  },
  skipValidation: process.env.npm_lifecycle_event === 'lint',
  emptyStringAsUndefined: true,
});
