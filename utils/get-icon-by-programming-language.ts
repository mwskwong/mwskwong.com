import { LiteralUnion } from "type-fest";

import JavaScript from "@/components/icons/javascript";
import Json from "@/components/icons/json";
import TypeScript from "@/components/icons/typescript";

const Icons = {
  js: JavaScript,
  jsx: JavaScript,
  ts: TypeScript,
  tsx: TypeScript,
  json: Json,
};

const getIconByProgrammingLanguage = (
  language: LiteralUnion<keyof typeof Icons, string>,
) => (language in Icons ? Icons[language as keyof typeof Icons] : undefined);

export default getIconByProgrammingLanguage;
