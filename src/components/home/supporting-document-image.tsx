'use client';

import mergeSx from 'merge-sx';
import { FC } from 'react';
import { SetOptional } from 'type-fest';

import { Image, ImageProps } from '@/components/image';
import { thumIoPdfLoader } from '@/utils/image-loaders';

export type SupportingDocumentImageProps = SetOptional<ImageProps, 'alt'>;
export const SupportingDocumentImage: FC<SupportingDocumentImageProps> = ({
  sx,
  ...props
}) => (
  <Image
    alt=""
    loader={thumIoPdfLoader}
    sx={mergeSx(
      {
        objectFit: 'cover',
        objectPosition: 'top',
        flexShrink: 0,
        borderRadius: 'var(--unstable_List-childRadius)',
        border: 1,
        borderColor: 'neutral.outlinedBorder',
      },
      sx,
    )}
    {...props}
  />
);
