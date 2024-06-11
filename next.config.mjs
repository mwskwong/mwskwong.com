// @ts-check

import NextBundleAnalyzer from '@next/bundle-analyzer';

import { env } from './src/env.mjs';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: env.ANALYZE,
});

const sharedSvgoPlugins = [
  'prefixIds',
  'removeRasterImages',
  'removeScriptElement',
  'removeOffCanvasPaths',
  'removeXlink',
  'removeXMLNS',
];

/** @type {import('next').NextConfig} */
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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        port: '',
        pathname: '/get/pdfSource/width/**',
      },
    ],
  },
  webpack: (config) => {
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
        resourceQuery: /monochrome/, // *.svg?monochrome
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
                  'removeStyleElement',
                  ...sharedSvgoPlugins,
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          // exclude if *.svg?url and *.svg?monochrome
          not: [...fileLoaderRule.resourceQuery.not, /monochrome/, /url/],
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: ['preset-default', ...sharedSvgoPlugins],
              },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
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
      ],
    },
  ],
  logging: { fetches: { fullUrl: true } },
  experimental: {
    reactCompiler: false, // disabling for now since watch() from React Hook Form isn't returning the updated form value
    ppr: true,
    after: true,
    webpackBuildWorker: true,
    optimizePackageImports: ['@mui/joy'],
  },
};

export default withBundleAnalyzer(config);
