'use client';

import { styled } from '@mui/joy';
import { type Theme } from '@mui/joy/styles/types';
import { type StyledComponent } from '@mui/styled-engine';
import { type MUIStyledCommonProps } from '@mui/system';
import { mergeSx } from 'merge-sx';
import NextImage from 'next/image';
import { type ComponentProps, type FC } from 'react';

const StyledImage = styled(NextImage)() as StyledComponent<
  ComponentProps<typeof NextImage> & MUIStyledCommonProps<Theme>
>; // FIXME: React 19 workaround: force casting styled()() return type to the correct type
type StyledImageProps = ComponentProps<typeof StyledImage>;

export interface ImageProps extends Omit<StyledImageProps, 'src'> {
  src?: StyledImageProps['src'];
  srcLight?: StyledImageProps['src'];
  srcDark?: StyledImageProps['src'];
}

export const Image: FC<ImageProps> = ({
  src,
  srcLight,
  srcDark,
  sx,
  ...props
}) => {
  if (src) {
    return <StyledImage src={src} sx={sx} {...props} />;
  }

  return (
    <>
      {srcLight ? (
        <StyledImage
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
      ) : null}
      {srcDark ? (
        <StyledImage
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
      ) : null}
    </>
  );
};
