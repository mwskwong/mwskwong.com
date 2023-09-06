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
      // MUI Joy convention
      polymorphicPropName: 'component',
      components: {
        Button: 'button',
        Icon: 'svg',
        IconButton: 'button',
        Image: 'img',
        Input: 'input',
        Link: 'a',
        List: 'ul',
        ListItem: 'li',
        ListItemButton: 'button',
        ListDivider: 'li',
        NextImage: 'img',
        NextLink: 'a',
        SvgIcon: 'svg',
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
    // such that @/* imports will not being considered as external dependencies
    'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // sort import statements
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    // sort named imports
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
  },
  // Next.js file naming convention
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
