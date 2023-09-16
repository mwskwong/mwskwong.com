/**
 * @see {@link https://github.com/shikijs/shiki/issues/138#issuecomment-1057471160}
 * @see {@link https://github.com/memos-pub/memos.pub/blob/a3babb1f149f05c43012278331f885d81f5fcfac/lib/mdx/plugins/code.ts}
 */

import { readdir } from 'node:fs/promises';

import { Options } from 'rehype-pretty-code';
import { getHighlighter } from 'shiki';

let shikiTouched = false;

export const getSsrRehypeCodeHighlighter: Options['getHighlighter'] = (
  options,
) => {
  if (!shikiTouched) {
    void readdir('shiki');
    shikiTouched = true;
  }

  // @ts-expect-error This is technically not compatible with shiki's interface but necessary for rehype-pretty-code to work
  return getHighlighter({
    ...options,
    paths: {
      languages: 'shiki/languages/',
      themes: 'shiki/themes/',
    },
  });
};
