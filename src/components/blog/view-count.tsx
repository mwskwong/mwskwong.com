import Skeleton from '@mui/joy/Skeleton';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import { Eye } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import { FC } from 'react';

import { prisma } from '@/lib/clients';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

// TODO: this can be a problem in `/blog` page, since it queries the DB more than it needs
export const ViewCount: FC<ViewCountProps> = async ({ blogId, ...props }) => {
  noStore();
  const metadata = await prisma.blogMetadata.findUnique({
    where: { id: blogId },
  });

  return (
    <Typography startDecorator={<Eye />} {...props}>
      {numberFormatter.format(metadata?.view ?? 0)} views
    </Typography>
  );
};

export const ViewCountSkeleton: FC<Omit<TypographyProps, 'children'>> = (
  props,
) => (
  <Typography startDecorator={<Eye />} {...props}>
    <Skeleton sx={{ mr: 0.5 }} variant="text" width="3ch" /> views
  </Typography>
);
