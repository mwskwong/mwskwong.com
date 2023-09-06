'use client';

import AspectRatio from '@mui/joy/AspectRatio';
import { useTheme } from '@mui/joy/styles';
import mergeSx from 'merge-sx';
import { ComponentProps, FC } from 'react';
import { SetOptional } from 'type-fest';

import { Image } from '../image';

export type BlogCardImageProps = SetOptional<
  ComponentProps<typeof Image>,
  'alt'
>;

// FIXME: with zero runtime, we may be able to add this back to `blog-card`
export const BlogCardImage: FC<BlogCardImageProps> = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <AspectRatio objectFit="cover" ratio="1200/630" variant="outlined">
      <Image
        alt=""
        fill
        role="presentation"
        sizes={[
          `${theme.breakpoints.up('lg')} ${
            theme.breakpoints.values.lg / (12 / 4)
          }px`,
          `${theme.breakpoints.up('md')} ${Math.round((4 / 12) * 100)}vw`,
          `${theme.breakpoints.up('sm')} ${Math.round((6 / 12) * 100)}vw`,
          '100vw',
        ]
          .join(',')
          .replaceAll('@media ', '')}
        sx={mergeSx({ width: '100%', height: 'auto', objectFit: 'cover' }, sx)}
        {...props}
      />
    </AspectRatio>
  );
};
