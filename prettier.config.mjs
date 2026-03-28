// @ts-check

/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-packagejson"],
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["cn"],
};

export default prettierConfig;
