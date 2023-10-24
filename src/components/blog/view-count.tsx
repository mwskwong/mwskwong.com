import { VisibilityRounded } from '@mui/icons-material';
import { Skeleton, Typography, TypographyProps } from '@mui/joy';
import { unstable_noStore as noStore } from 'next/cache';
import { FC, cache } from 'react';

import { prisma } from '@/lib/db';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  fallback?: boolean;
  blogId?: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });
const getBlogMetadataById = cache((id: string) =>
  prisma.blogMetadata.findUnique({ where: { id } }),
);

export const ViewCount: FC<ViewCountProps> = async ({
  fallback = false,
  blogId,
  ...props
}) => {
  noStore();
  const metadata =
    !fallback && blogId ? await getBlogMetadataById(blogId) : null;

  return (
    <Typography startDecorator={<VisibilityRounded />} {...props}>
      {fallback ? (
        <Skeleton sx={{ mr: 0.5 }} variant="text" width="3ch" />
      ) : (
        numberFormatter.format(metadata?.view ?? 0)
      )}{' '}
      views
    </Typography>
  );
};
