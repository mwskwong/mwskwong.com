const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: { project },
  settings: {
    'import/resolver': { typescript: { project } },
    'jsx-a11y': {
      polymorphicPropName: 'component',
      components: {
        Button: 'button',
        IconButton: 'button',
        Image: 'img',
        Input: 'input',
        Link: 'a',
        List: 'ul',
        ListItem: 'li',
        ListItemButton: 'button',
        ListDivider: 'li',
        Textarea: 'textarea',
      },
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/page.tsx',
        '**/layout.tsx',
        '**/not-found.tsx',
        '**/sitemap.ts',
      ],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};
