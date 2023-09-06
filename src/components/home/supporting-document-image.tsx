'use client';

import mergeSx from 'merge-sx';
import { ComponentProps, FC } from 'react';
import { SetOptional } from 'type-fest';
import { Image } from '@/components/image';
import { thumIoPdfLoader } from '@/utils/image-loader';

type SupportingDocumentImageProps = SetOptional<
  ComponentProps<typeof Image>,
  'alt'
>;

export const SupportingDocumentImage: FC<SupportingDocumentImageProps> = ({
  sx,
  ...props
}) => (
  <Image
    alt=""
    height={56}
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
    width={80}
    {...props}
  />
);
