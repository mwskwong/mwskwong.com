/* eslint-disable import/no-default-export -- SVGR Webpack module declaration */
declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGSVGElement>>;

  export default content;
}

declare module '*.svg?url' {
  import { StaticImageData } from 'next/image';

  const content: StaticImageData;

  export default content;
}
