import { LiteralUnion } from 'type-fest';

import { JavaScript } from '@/components/icons/javascript';
import { Json } from '@/components/icons/json';
import { React } from '@/components/icons/react';
import { TypeScript } from '@/components/icons/typescript';

const Icons = {
  js: JavaScript,
  jsx: React,
  ts: TypeScript,
  tsx: React,
  json: Json,
};

export const getIconByProgrammingLanguage = (
  language: LiteralUnion<keyof typeof Icons, string>,
) => (language in Icons ? Icons[language as keyof typeof Icons] : undefined);
