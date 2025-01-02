/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard'],
  rules: {
    'import-notation': 'string',
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be camelCase`,
      },
    ],
  },
};

export default config;
