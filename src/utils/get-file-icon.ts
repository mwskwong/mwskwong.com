import { LiteralUnion } from 'type-fest';

import { EsLint } from '@/components/icons/eslint';
import { JavaScript } from '@/components/icons/javascript';
import { Json } from '@/components/icons/json';
import { Prettier } from '@/components/icons/prettier';
import { React } from '@/components/icons/react';
import { TypeScript } from '@/components/icons/typescript';

const ProgrammingLangIcons = {
  js: JavaScript,
  jsx: React,
  ts: TypeScript,
  tsx: React,
  json: Json,
};

const SpecialFileIcons = {
  '.eslintrc.js': EsLint,
  '.prettierrc.js': Prettier,
};

export const getFileIcon = (
  language?: LiteralUnion<keyof typeof ProgrammingLangIcons, string>,
  filename?: string,
) => {
  if (filename && filename in SpecialFileIcons) {
    return SpecialFileIcons[filename as keyof typeof SpecialFileIcons];
  }

  if (language && language in ProgrammingLangIcons) {
    return ProgrammingLangIcons[language as keyof typeof ProgrammingLangIcons];
  }
};
