import {
  SiEslint,
  SiJavascript,
  SiJson,
  SiPrettier,
  SiReact,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import { LiteralUnion } from 'type-fest';

const FileExtIcons = {
  js: SiJavascript,
  jsx: SiReact,
  ts: SiTypescript,
  tsx: SiReact,
  json: SiJson,
};

const SpecialFileIcons = {
  '.eslintrc.js': SiEslint,
  '.prettierrc.js': SiPrettier,
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
