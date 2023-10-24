import { VisibilityRounded } from '@mui/icons-material';
import { Typography, TypographyProps } from '@mui/joy';
import { unstable_noStore as noStore } from 'next/cache';
import { FC, cache } from 'react';

import { prisma } from '@/lib/db';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });
const getBlogMetadataById = cache((id: string) =>
  prisma.blogMetadata.findUnique({ where: { id } }),
);

export const ViewCount: FC<ViewCountProps> = async ({ blogId, ...props }) => {
  noStore();
  const metadata = await getBlogMetadataById(blogId);

  return (
    <Typography startDecorator={<VisibilityRounded />} {...props}>
      {numberFormatter.format(metadata?.view ?? 0)} views
    </Typography>
  );
};
