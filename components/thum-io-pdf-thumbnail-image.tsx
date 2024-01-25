import { FC, forwardRef } from 'react';

import { thumIoPdfThumbnailLoader } from '@/image-loaders';

import { Image, ImageProps } from './image';

export type ThumIoPdfThumbnailImageProps = ImageProps;
export const ThumIoPdfThumbnailImage: FC<ThumIoPdfThumbnailImageProps> =
  forwardRef((props, ref) => (
    // eslint-disable-next-line jsx-a11y/alt-text -- alt pass via props
    <Image loader={thumIoPdfThumbnailLoader} ref={ref} {...props} />
  ));

ThumIoPdfThumbnailImage.displayName = 'ThumIoPdfThumbnailImage';
