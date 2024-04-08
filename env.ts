import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
// FIXME: switch to Valibot when @t3-oss/env-nextjs has it implemented
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.string().url(),
    CONTENTFUL_ENVIRONMENT: z.union([
      z.literal('master'),
      z.string().regex(/^canary_\d{4}-\d{2}-\d{2}T\d{2}\.\d{2}\.\d{2}\.\d{4}$/),
      z.literal('development'),
    ]),
    CONTENTFUL_SPACE_ID: z.string(),
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    EMAILJS_PUBLIC_KEY: z.string(),
    EMAILJS_PRIVATE_KEY: z.string(),
    EMAILJS_SERVICE_ID: z.string().startsWith('service_'),
    EMAILJS_CONTACT_FORM_TEMPLATE_ID: z.string().startsWith('template_'),
    ANALYZE: z.enum(['true', 'false']).optional(),
    CRON_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_PROD_URL: z.string(),
    // FIXME: workaround: vercel preset doesn't provide NEXT_PUBLIC_ env by default
    NEXT_PUBLIC_VERCEL_ENV: z
      .enum(['development', 'preview', 'production'])
      .optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PROD_URL: process.env.NEXT_PUBLIC_PROD_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  },
});
