// @ts-check

import NextBundleAnalyzer from '@next/bundle-analyzer';
import dedent from 'dedent';

import { env } from './src/env.mjs';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: env.ANALYZE,
});

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
};

export default withBundleAnalyzer(config);
