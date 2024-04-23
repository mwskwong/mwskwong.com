'use client';

import { styled } from '@mui/joy';
import { mergeSx } from 'merge-sx';
import NextImage from 'next/image';
import { type ComponentProps, type FC } from 'react';

export const Image = styled(NextImage)``;
export type ImageProps = ComponentProps<typeof Image>;

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
          (theme) => ({
            [theme.getColorSchemeSelector('dark')]: {
              display: 'none',
            },
          }),
          sx,
        )}
        {...props}
      />
      <Image
        alt={alt}
        src={srcDark}
        sx={mergeSx(
          (theme) => ({
            display: 'none',
            [theme.getColorSchemeSelector('dark')]: {
              display: 'unset',
            },
          }),
          sx,
        )}
        {...props}
      />
    </>
  );
};
