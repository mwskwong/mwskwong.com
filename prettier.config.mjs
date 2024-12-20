import vercelPrettierConfig from '@vercel/style-guide/prettier';

/** @type {import('prettier').Config} */
const config = {
  ...vercelPrettierConfig,
  plugins: [...vercelPrettierConfig.plugins, 'prettier-plugin-prisma'],
};

export default config;
