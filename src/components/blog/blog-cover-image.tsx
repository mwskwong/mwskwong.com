'use client';

import { useTheme } from '@mui/joy';
import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { Image, type ImageProps } from '../image';

export type BlogCoverImageProps = ImageProps;
export const BlogCoverImage: FC<BlogCoverImageProps> = ({
  alt,
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Image
      alt={alt}
      height={(theme.breakpoints.values.md / 1200) * 630}
      width={theme.breakpoints.values.md}
      sizes={[
        `(min-width: ${theme.breakpoints.values.md}px) ${theme.breakpoints.values.md}px`,
        '100vw',
      ].join(',')}
      sx={mergeSx(
        {
          display: 'block',
          width: '100%',
          height: 'auto',
          border: 1,
          borderColor: 'neutral.outlinedBorder',
          borderRadius: 'md',
        },
        sx,
      )}
      {...props}
    />
  );
};
