'use client';

import { Skeleton, Typography, type TypographyProps } from '@mui/joy';
import { Eye } from 'lucide-react';
import { type FC, use, useEffect } from 'react';

import { incrBlogViewById } from '@/lib/actions';

export interface ViewsProps extends Omit<TypographyProps, 'children'> {
  blogMetadataPromise: Promise<
    | {
        id: string;
        view: number;
      }
    | null
    | undefined
  >;
  readOnly?: boolean;
  hideIcon?: boolean;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const Views: FC<ViewsProps> = ({
  blogMetadataPromise,
  readOnly = false,
  hideIcon = false,
  ...props
}) => {
  const metadata = use(blogMetadataPromise);

  useEffect(() => {
    if (metadata?.id && !readOnly) {
      void incrBlogViewById(metadata.id);
    }
  }, [metadata?.id, readOnly]);

  return (
    <Typography startDecorator={!hideIcon && <Eye />} {...props}>
      {numberFormatter.format(metadata?.view ?? 0)} views
    </Typography>
  );
};

export type ViewsSkeletonProps = Omit<
  ViewsProps,
  'blogMetadataPromise' | 'readOnly'
>;

export const ViewsSkeleton: FC<ViewsSkeletonProps> = ({
  hideIcon,
  ...props
}) => (
  <Typography
    // FIXME: not using sx prop here to prevent CLS
    display={hideIcon ? 'flex' : undefined}
    startDecorator={!hideIcon && <Eye />}
    {...props}
  >
    <Skeleton level={props.level} variant="text" width="3ch" />
    &nbsp;views
  </Typography>
);

export type ViewsErrorProps = ViewsSkeletonProps;
export const ViewsError: FC<ViewsErrorProps> = ({ hideIcon, ...props }) => (
  <Typography
    // FIXME: not using sx prop here to prevent CLS
    display={hideIcon ? 'flex' : undefined}
    startDecorator={!hideIcon && <Eye />}
    {...props}
  >
    –– views
  </Typography>
);
