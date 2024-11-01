// @ts-check

/** @type {import('prettier').Config} */
const config = {
  importOrderSeparation: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-prisma",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
