'use client';

import { IconButton, Stack, StackProps, Typography } from '@mui/joy';
import { Heart } from 'lucide-react';
import { FC, startTransition, useOptimistic } from 'react';

import { likeBlog, unlikeBlog } from '@/lib/actions';

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export interface LikeButtonProps extends Omit<StackProps, 'children'> {
  blogId: string;
  userId?: string;
  like?: number;
  liked: boolean;
}

export const LikeButton: FC<LikeButtonProps> = ({
  blogId,
  userId,
  like = 0,
  liked,
  ...props
}) => {
  const [optimisticLike, setOptimisticLike] = useOptimistic(like);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);

  return (
    <Stack alignItems="center" direction="row" {...props}>
      <IconButton
        aria-label={optimisticLiked ? 'Unlike blog' : 'Like blog'}
        color={optimisticLiked ? 'danger' : 'neutral'}
        onClick={() => {
          startTransition(() => {
            const preLiked = optimisticLiked;
            setOptimisticLike((prev) => (preLiked ? prev - 1 : prev + 1));
            setOptimisticLiked((prev) => !prev);
            if (preLiked) {
              void unlikeBlog(blogId, userId);
            } else {
              void likeBlog(blogId, userId);
            }
          });
        }}
      >
        <Heart fill={optimisticLiked ? 'currentColor' : 'transparent'} />
      </IconButton>
      <Typography>{numberFormatter.format(optimisticLike)}</Typography>
    </Stack>
  );
};
