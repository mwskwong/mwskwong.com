'use client';

import { useTheme } from '@mui/joy';
import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { Image, type ImageProps } from '../image';

export type BlogCardImageProps = ImageProps;
export const BlogCardImage: FC<BlogCardImageProps> = ({
  alt,
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Image
      alt={alt}
      height={1280}
      width={2560}
      sizes={[
        `(min-width: ${theme.breakpoints.values.lg}px) ${Math.round((4 / 12) * theme.breakpoints.values.lg)}px`,
        `(min-width: ${theme.breakpoints.values.md}px) ${Math.round((4 / 12) * 100)}vw`,
        `(min-width: ${theme.breakpoints.values.sm}px) ${Math.round((6 / 12) * 100)}vw`,
        '100vw',
      ].join(',')}
      sx={mergeSx(
        {
          width: '100%',
          height: 'auto',
          border: 1,
          borderColor: 'neutral.outlinedBorder',
          borderRadius: 'var(--Card-childRadius)',
        },
        sx,
      )}
      {...props}
    />
  );
};
