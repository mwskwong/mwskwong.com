import {
  type InferOutput,
  custom,
  literal,
  minLength,
  object,
  optional,
  parse,
  picklist,
  pipe,
  regex,
  startsWith,
  string,
  url,
} from 'valibot';

const VercelEnvSchema = optional(
  picklist(['development', 'preview', 'production']),
);

const EnvSchema = object({
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
  ANALYZE: optional(picklist(['true', 'false'])),
  // WORKAROUND: self invoke a function here to avoid circular dependency between EnvSchema and process.env
  CRON_SECRET: (() => {
    if (process.env.VERCEL === '1') {
      return string();
    }

    return optional(string());
  })(),
  NEXT_PUBLIC_SITE_URL: pipe(string(), url()),
  NEXT_PUBLIC_SITE_DISPLAY_NAME: pipe(string(), minLength(1)),
  NEXT_PUBLIC_VERCEL_ENV: VercelEnvSchema,
  PORT: optional(
    pipe(
      string(),
      custom((input) => !isNaN(Number(input)), 'Should be a `{number}`'),
    ),
  ),
  NEXT_PUBLIC_VERCEL_BRANCH_URL: optional(string()),
  NEXT_PUBLIC_VERCEL_URL: optional(string()),
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string(),
});

if (process.env.npm_lifecycle_event !== 'lint') {
  parse(EnvSchema, process.env);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- this is a valid namespace form @types/node
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface -- ProcessEnv is an interface, extending it here
    interface ProcessEnv extends InferOutput<typeof EnvSchema> {}
  }
}
