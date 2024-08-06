import { capitalize } from 'lodash-es';

export const siteUrl = (() => {
  const localUrl = `http://localhost:${process.env.PORT ?? 3000}`;
  if (process.env.NODE_ENV === 'development') return localUrl;

  const previewDeploymentHostname =
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;
  const previewDeploymentUrl = previewDeploymentHostname
    ? `https://${previewDeploymentHostname}`
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
})();

export const siteDisplayName = capitalize(
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
);
