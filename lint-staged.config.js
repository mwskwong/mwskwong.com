import { relative } from 'node:path';

const config = {
  '*': 'prettier --check',
  '*.{js,jsx,cjs,mjs,ts,tsx}': [
    (filenames) =>
      `next lint --file ${filenames
        .map((f) => relative(process.cwd(), f))
        .join(' --file ')}`,
    'eslint',
  ],
};

export default config;
