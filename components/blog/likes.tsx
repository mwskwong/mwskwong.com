import { Skeleton, Typography, TypographyProps } from '@mui/joy';
import { SystemProps } from '@mui/joy/styles/types';
import { Eye, Heart } from 'lucide-react';
import { cookies } from 'next/headers';
import { FC } from 'react';

import {
  getBlogMetadataById,
  getBlogsMetadataByIds,
  hasUserLikedBlog,
} from '@/lib/queries';

import { LikeButton } from './like-button';

export interface LikesProps extends Omit<SystemProps, 'color'> {
  /**
   * Expected to be used when there are multiple Likes mounted in the same page.
   * When blogIds is specified, LikeCount will fetch multiple blog metadata by IDs at once,
   * cache the response, and do arr.find() on the cached response
   * The cache will only be valid with in the current server request.
   * This allows me to avoid running multiple DB queries in the listing page
   */
  blogIds?: string[];
  blogId: string;
  readOnly?: boolean;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const Likes: FC<LikesProps> = async ({
  blogIds,
  blogId,
  readOnly,
  ...props
}) => {
  const metadata = blogIds
    ? (await getBlogsMetadataByIds(blogIds)).find(({ id }) => id === blogId)
    : await getBlogMetadataById(blogId);

  if (readOnly) {
    return (
      <Typography startDecorator={<Heart aria-label="likes" />} {...props}>
        {numberFormatter.format(metadata?.like ?? 0)}
      </Typography>
    );
  }

  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  const liked = userId ? await hasUserLikedBlog(blogId, userId) : false;

  return (
    <LikeButton
      blogId={blogId}
      like={metadata?.like}
      liked={liked}
      userId={userId}
      {...props}
    />
  );
};

export const LikesSkeleton: FC<Omit<TypographyProps, 'children'>> = (props) => (
  <Typography startDecorator={<Eye aria-label="likes" />} {...props}>
    <Skeleton level={props.level} variant="text" width="3ch" />
  </Typography>
);
