// @ts-check

/** @type {import('prettier').Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-prisma",
    "prettier-plugin-css-order",
  ],
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSideEffects: false,
  cssDeclarationSorterKeepOverrides: false,
};

export default config;
