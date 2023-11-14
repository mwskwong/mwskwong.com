'use client';

import { FC } from 'react';

import { Image, ImageProps } from '@/components/image';
import { thumIoPdfLoader } from '@/utils/image-loaders';

export type PdfImageProps = ImageProps;
export const PdfImage: FC<PdfImageProps> = ({ alt, ...props }) => (
  <Image alt={alt} loader={thumIoPdfLoader} {...props} />
);
