import { LiteralUnion } from 'type-fest';

import { EsLint } from '@/components/icons/eslint';
import { JavaScript } from '@/components/icons/javascript';
import { Json } from '@/components/icons/json';
import { Prettier } from '@/components/icons/prettier';
import { React } from '@/components/icons/react';
import { TypeScript } from '@/components/icons/typescript';

const FileExtIcons = {
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
  filename?: LiteralUnion<keyof typeof SpecialFileIcons, string>,
) => {
  if (filename && filename in SpecialFileIcons) {
    return SpecialFileIcons[filename as keyof typeof SpecialFileIcons];
  }

  const fileExt = filename?.split('.').at(-1);
  if (fileExt && fileExt in FileExtIcons) {
    return FileExtIcons[fileExt as keyof typeof FileExtIcons];
  }
};
