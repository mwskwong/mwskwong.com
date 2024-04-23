import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { Image, type ImageProps } from './image';

export interface ThemeImageProps
  extends Omit<ImageProps, 'src' | 'priority' | 'loading'> {
  srcLight: string;
  srcDark: string;
}

export const ThemeImage: FC<ThemeImageProps> = ({
  srcLight,
  srcDark,
  alt,
  sx,
  ...props
}) => {
  return (
    <>
      <Image
        alt={alt}
        src={srcLight}
        sx={mergeSx(
          {
            '[data-joy-color-scheme="dark"] &': {
              display: 'none',
            },
          },
          sx,
        )}
        {...props}
      />
      <Image
        alt={alt}
        src={srcDark}
        sx={mergeSx(
          {
            display: 'none',
            '[data-joy-color-scheme="dark"] &': {
              display: 'unset',
            },
          },
          sx,
        )}
        {...props}
      />
    </>
  );
};
