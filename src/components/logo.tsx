import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { Image, type ImageProps } from './image';

export interface LogoProps extends ImageProps {
  size?: 'sm' | 'md' | 'lg';
}

const getSize = (size: LogoProps['size'] = 'md') => {
  switch (size) {
    case 'sm':
      return 28;
    case 'md':
      return 32;
    case 'lg':
      return 36;
  }
};

export const Logo: FC<LogoProps> = ({
  size = 'md',
  alt,
  height,
  width,
  sx,
  ...props
}) => (
  <Image
    alt={alt}
    height={height ?? getSize(size)}
    sx={mergeSx({ objectFit: 'scale-down' }, sx)}
    width={width ?? getSize(size)}
    {...props}
  />
);
