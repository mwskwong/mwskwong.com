import Box from '@mui/joy/Box';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import { Eye } from 'lucide-react';
import { FC } from 'react';

import { getBlogMetadataById, getBlogsMetadataByIds } from '@/lib/queries';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  /**
   * Expected to be used when there are multiple ViewCounts mounted in the same page.
   * When blogIds is specified, ViewCount will fetch multiple blog metadata by IDs at once,
   * cache the response, and do arr.find() on the cached response
   * The cache will only be valid with in the current server request.
   * This allows me to avoid running multiple DB queries in the listing page
   */
  blogIds?: string[];
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const ViewCount: FC<ViewCountProps> = async ({
  blogIds,
  blogId,
  ...props
}) => {
  const metadata = blogIds
    ? (await getBlogsMetadataByIds(blogIds)).find(({ id }) => id === blogId)
    : await getBlogMetadataById(blogId);

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
    <Box component="span" width="3ch" />
    &nbsp;views
  </Typography>
);
