'use client';

import { FC } from 'react';

import { thumIoPdfLoader } from '@/image-loaders';

import { Image, ImageProps } from './image';

export const ThumIoPdfImage: FC<ImageProps> = (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text -- provided by props
  <Image loader={thumIoPdfLoader} {...props} />
);
