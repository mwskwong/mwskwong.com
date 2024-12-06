import vercelPrettierConfig from '@vercel/style-guide/prettier';

/** @type {import('prettier').Config} */
export default {
  ...vercelPrettierConfig,
  plugins: [...vercelPrettierConfig.plugins, 'prettier-plugin-prisma'],
};
