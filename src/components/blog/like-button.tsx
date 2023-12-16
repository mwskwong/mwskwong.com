'use client';

import IconButton from '@mui/joy/IconButton';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Heart } from 'lucide-react';
import { FC, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { likeBlog, unlikeBlog } from '@/lib/actions';
import { hasVisitorLikedBlog } from '@/lib/queries';
import { useFingerprint } from '@/utils/use-fingerprint';

export interface LikeButtonProps extends Omit<StackProps, 'children'> {
  blogId: string;
  like?: number;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const LikeButton: FC<LikeButtonProps> = ({ blogId, like, ...props }) => {
  const fingerprint = useFingerprint();

  const [optimisticLike, setOptimisticLike] = useState(like);

  const { data: liked, mutate } = useSWRImmutable(
    fingerprint?.visitorId ? ['liked', fingerprint.visitorId, blogId] : null,
    () => hasVisitorLikedBlog(fingerprint?.visitorId ?? '', blogId),
    { keepPreviousData: true },
  );

  return (
    <Stack alignItems="center" direction="row" {...props}>
      <IconButton
        color={liked ? 'danger' : undefined}
        onClick={async () => {
          if (liked !== undefined && fingerprint?.visitorId) {
            const prevLike = like;
            try {
              setOptimisticLike((like) => (like ?? 0) + (liked ? -1 : 1));
              await mutate(
                async () => {
                  if (liked) {
                    await unlikeBlog(fingerprint.visitorId, blogId);
                    return false;
                  }

                  await likeBlog(fingerprint.visitorId, blogId);
                  return true;
                },
                {
                  optimisticData: (liked) => !liked,
                  rollbackOnError: true,
                },
              );
            } catch (error) {
              setOptimisticLike(prevLike);
            }
          }
        }}
      >
        <Heart />
      </IconButton>
      <Typography>{numberFormatter.format(optimisticLike ?? 0)}</Typography>
    </Stack>
  );
};
