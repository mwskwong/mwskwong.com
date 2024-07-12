import NextBundleAnalyzer from '@next/bundle-analyzer';
import dedent from 'dedent';
import { type NextConfig } from 'next';

import { env } from './src/env';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: env.ANALYZE,
});

const config = {
  compiler: {
    emotion: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        port: '',
        pathname: '/get/pdfSource/width/**',
      },
    ],
  },
  /* eslint-disable @typescript-eslint/no-unsafe-assignment -- config is any type */
  /* eslint-disable @typescript-eslint/no-unsafe-call -- config is any type */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access -- config is any type */
  /* eslint-disable @typescript-eslint/no-unsafe-return -- config is any type */
  webpack: (config) => {
    // @ts-expect-error rule is any type since config is any type
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: { overrides: { inlineStyles: false } },
                  },
                  'prefixIds',
                  'removeStyleElement',
                ],
              },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  /* eslint-enable -- reenable all eslint rules */
  // eslint-disable-next-line @typescript-eslint/require-await -- headers must be async
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Content-Security-Policy',
          value: dedent`
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' images.ctfassets.net blob: data:;
            font-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
          `.replace(/\n/g, ''),
        },
      ],
    },
  ],
  logging: { fetches: { fullUrl: true } },
  experimental: {
    reactCompiler: true,
    ppr: true,
    webpackBuildWorker: true,
    optimizePackageImports: ['@mui/joy'],
  },
} satisfies NextConfig;

export default withBundleAnalyzer(config);
