import { clsx } from 'clsx';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { type FC } from 'react';

import classes from './image.module.css';

export type ImageProps =
  | (NextImageProps & {
      srcLight?: never;
      srcDark?: never;
    })
  | (Omit<NextImageProps, 'src'> & {
      src?: never;
      srcLight: NextImageProps['src'];
      srcDark: NextImageProps['src'];
    });

export const Image: FC<ImageProps> = ({
  src,
  srcLight,
  srcDark,
  className,
  ...props
}) => {
  if (src) {
    return <NextImage className={className} src={src} {...props} />;
  }

  return (
    <>
      {srcLight ? (
        <NextImage
          className={clsx(classes.darkHidden, className)}
          src={srcLight}
          {...props}
        />
      ) : null}
      {srcDark ? (
        <NextImage
          className={clsx(classes.lightHidden, className)}
          src={srcDark}
          {...props}
        />
      ) : null}
    </>
  );
};
