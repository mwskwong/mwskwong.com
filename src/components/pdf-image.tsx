'use client';

import { FC } from 'react';

import { Image, ImageProps } from '@/components/image';
import { thumIoPdfLoader } from '@/utils/image-loaders';

export type PdfImageProps = ImageProps;
export const PdfImage: FC<PdfImageProps> = (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is already a required field in props
  <Image loader={thumIoPdfLoader} {...props} />
);
