'use client'; // FIXME: for the sake of accessing theme.breakpoints, may not be needed once zero CSS runtime is in place

import AspectRatio from '@mui/joy/AspectRatio';
import { useTheme } from '@mui/joy/styles';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

import { Image, ImageProps } from '../image';

export type BlogCardImageProps = ImageProps;
export const BlogCardImage: FC<BlogCardImageProps> = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <AspectRatio objectFit="cover" ratio="1200/630" variant="outlined">
      {/* eslint-disable-next-line jsx-a11y/alt-text --  provided by parent */}
      <Image
        fill
        sizes={[
          `${theme.breakpoints.up('lg')} ${theme.breakpoints.values.lg / (12 / 4)}px`,
          `${theme.breakpoints.up('md')} ${Math.round((4 / 12) * 100)}vw`,
          `${theme.breakpoints.up('sm')} ${Math.round((6 / 12) * 100)}vw`,
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
