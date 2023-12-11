import Box from '@mui/joy/Box';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import { Eye } from 'lucide-react';
import { FC, cache } from 'react';

import { getBlogMetadata } from '@/lib/queries';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

// Use React.cache here, because we want to achieve the following
//    1. getBlogMetadata is only called once in the blog listing page
//    2. The result of getBlogMetadata is NOT cached in server wide,
//       i.e. when the user refreshes the page, it should see the metadata updated
// It works, because React will invalidate the cache for all memoized functions for each server request.
// See https://react.dev/reference/react/cache#caveats
const cachedGetBlogMetadata = cache(getBlogMetadata);

export const ViewCount: FC<ViewCountProps> = async ({ blogId, ...props }) => {
  const metadata = (await cachedGetBlogMetadata()).find(
    ({ id }) => id === blogId,
  );

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
