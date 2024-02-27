// @ts-check

import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const sharedSvgoPlugins = [
  'prefixIds',
  'removeRasterImages',
  'removeScriptElement',
  'removeOffCanvasPaths',
  'reusePaths',
  'removeXlink',
  'removeXMLNS',
];

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: { dirs: ['app', 'components', 'constants', 'lib'] },
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
  /**
   * only works for `fetch` for now
   * @see {@link https://nextjs.org/docs/app/api-reference/next-config-js/logging}
   */
  logging: { fetches: { fullUrl: true } },
  experimental: {
    ppr: true,
    webpackBuildWorker: true,
    optimizePackageImports: ['@mui/joy', '@mui/base'],
    optimizeServerReact: true,
  },
};

export default withBundleAnalyzer(config);
