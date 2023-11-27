import Box from '@mui/joy/Box';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import { Eye } from 'lucide-react';
import { FC } from 'react';

import { getBlogMetadataById } from '@/lib/queries';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

// TODO: this can be a problem in `/blog` page, since it queries the DB more than it needs
export const ViewCount: FC<ViewCountProps> = async ({ blogId, ...props }) => {
  const metadata = await getBlogMetadataById(blogId);

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
    <Box component="span" mr={0.5} width="3ch" /> views
  </Typography>
);
