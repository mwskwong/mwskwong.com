import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { capitalize } from 'lodash-es';
// FIXME: switch to Valibot when @t3-oss/env-nextjs has it implemented
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  server: {
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
              .regex(/^canary_\d{4}-\d{2}-\d{2}T\d{2}\.\d{2}\.\d{2}\.\d{3}Z$/)
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
      .optional()
      .transform((analyze) => analyze === 'true'),
    CRON_SECRET:
      process.env.VERCEL === '1' ? z.string() : z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_DISPLAY_NAME: z.string(),
    NEXT_PUBLIC_VERCEL_ENV: z
      .enum(['development', 'preview', 'production'])
      .optional(),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // Ref: https://github.com/vercel/next.js/blob/677c9b372faef680d17e9ba224743f44e1107661/packages/next/src/lib/metadata/resolvers/resolve-url.ts#L24
    NEXT_PUBLIC_SITE_URL: (() => {
      const localUrl = `http://localhost:${process.env.PORT ?? 3000}`;
      if (process.env.NODE_ENV === 'development') return localUrl;

      const previewDeploymentOrigin =
        process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL;
      const previewDeploymentUrl = previewDeploymentOrigin
        ? `https://${previewDeploymentOrigin}`
        : undefined;
      if (
        process.env.NODE_ENV === 'production' &&
        previewDeploymentUrl &&
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ) {
        return previewDeploymentUrl;
      }

      const productionDeploymentUrl = process.env
        .NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
        : undefined;
      return productionDeploymentUrl ?? localUrl;
    })(),
    NEXT_PUBLIC_SITE_DISPLAY_NAME:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL &&
      capitalize(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL),
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
  skipValidation: process.env.npm_lifecycle_event === 'lint',
  emptyStringAsUndefined: true,
});
