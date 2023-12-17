import Box from '@mui/joy/Box';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import { Eye } from 'lucide-react';
import { FC } from 'react';

import { incrBlogViewById } from '@/lib/actions';
import { getBlogMetadataById, getBlogsMetadataByIds } from '@/lib/queries';

export interface ViewsProps extends Omit<TypographyProps, 'children'> {
  /**
   * Expected to be used when there are multiple Views mounted in the same page.
   * When blogIds is specified, ViewCount will fetch multiple blog metadata by IDs at once,
   * cache the response, and do arr.find() on the cached response
   * The cache will only be valid with in the current server request.
   * This allows me to avoid running multiple DB queries in the listing page
   */
  blogIds?: string[];
  blogId: string;
  readOnly?: boolean;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const Views: FC<ViewsProps> = async ({
  blogIds,
  blogId,
  readOnly,
  ...props
}) => {
  const metadata = blogIds
    ? (await getBlogsMetadataByIds(blogIds)).find(({ id }) => id === blogId)
    : await getBlogMetadataById(blogId);

  if (!readOnly) void incrBlogViewById(blogId);

  return (
    <Typography aria-label="Blog views" startDecorator={<Eye />} {...props}>
      {numberFormatter.format(metadata?.view ?? 0)}
    </Typography>
  );
};

export const ViewsSkeleton: FC<Omit<TypographyProps, 'children'>> = (props) => (
  <Typography aria-label="Blog views" startDecorator={<Eye />} {...props}>
    <Box component="span" width="3ch" />
  </Typography>
);
