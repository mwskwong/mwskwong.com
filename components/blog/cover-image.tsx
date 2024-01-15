'use client'; // FIXME: for the sake of accessing theme.breakpoints, may not be needed once zero CSS runtime is in place

import AspectRatio from '@mui/joy/AspectRatio';
import { useTheme } from '@mui/joy/styles';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

import { Image, ImageProps } from '../image';

export type CoverImageProps = ImageProps;
export const CoverImage: FC<CoverImageProps> = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <AspectRatio
      objectFit="cover"
      ratio="1200/630"
      sx={{ borderRadius: 'md' }}
      variant="outlined"
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- provided by parent */}
      <Image
        fill
        priority
        sizes={[
          `${theme.breakpoints.up('md')} ${theme.breakpoints.values.md}px`,
          '100vw',
        ]
          .join(',')
          .replaceAll('@media ', '')}
        sx={mergeSx({ width: '100%', height: 'auto' }, sx)}
        {...props}
      />
    </AspectRatio>
  );
};
