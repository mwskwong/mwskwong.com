import { capitalize } from 'lodash-es';
import {
  type InferOutput,
  literal,
  object,
  optional,
  picklist,
  pipe,
  regex,
  safeParse,
  startsWith,
  string,
  transform,
  url,
} from 'valibot';

const VercelEnvSchema = optional(
  picklist(['development', 'preview', 'production']),
);

const SharedEnvSchema = object({
  NODE_ENV: picklist(['development', 'test', 'production']),
});

const ServerEnvSchema = object({
  NODE_ENV: picklist(['development', 'test', 'production']),
  DATABASE_URL: pipe(string(), url()),
  VERCEL_ENV: VercelEnvSchema,
  CONTENTFUL_ENVIRONMENT: (() => {
    switch (process.env.VERCEL_ENV) {
      case 'production':
        return literal('master');
      case 'preview':
        return pipe(
          string(),
          // matching canary_YYYY-MM-DDTHH.mm.ss.SSSS
          regex(/^canary_\d{4}-\d{2}-\d{2}T\d{2}\.\d{2}\.\d{2}\.\d{3}Z$/),
        );
      default:
        return literal('development');
    }
  })(),
  CONTENTFUL_SPACE_ID: string(),
  CONTENTFUL_ACCESS_TOKEN: string(),
  RESEND_API_KEY: pipe(string(), startsWith('re_')),
  ANALYZE: pipe(
    optional(picklist(['true', 'false'])),
    transform((analyze) => analyze === 'true'),
  ),
  CRON_SECRET: process.env.VERCEL === '1' ? string() : optional(string()),
});

const ClientEnvSchema = object({
  NEXT_PUBLIC_SITE_URL: pipe(string(), url()),
  NEXT_PUBLIC_SITE_DISPLAY_NAME: string(),
  NEXT_PUBLIC_VERCEL_ENV: VercelEnvSchema,
});

const runtimeEnv = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV,
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
};

const EnvSchema = object({
  ...SharedEnvSchema.entries,
  ...ServerEnvSchema.entries,
  ...ClientEnvSchema.entries,
});

const { success, output, issues } =
  typeof window === 'undefined'
    ? safeParse(EnvSchema, runtimeEnv)
    : safeParse(
        object({ ...SharedEnvSchema.entries, ...ClientEnvSchema.entries }),
        runtimeEnv,
      );

if (!success) {
  // eslint-disable-next-line no-console -- for development purpose
  console.error('❌ Invalid environment variables:', issues);
  throw new Error('Invalid environment variables');
}

export const env = new Proxy(output as InferOutput<typeof EnvSchema>, {
  get(target, prop) {
    if (typeof prop !== 'string') return undefined;
    if (prop === '__esModule' || prop === '$$typeof') return undefined;
    if (
      !(
        typeof window === 'undefined' ||
        prop === 'NODE_ENV' ||
        prop.startsWith('NEXT_PUBLIC_')
      )
    ) {
      throw new Error(
        '❌ Attempted to access a server-side environment variable on the client',
      );
    }

    return Reflect.get(target, prop) as unknown;
  },
});
