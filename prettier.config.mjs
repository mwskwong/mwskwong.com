// @ts-check

/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-packagejson"],
  tailwindFunctions: ["cn"],
};

export default prettierConfig;
