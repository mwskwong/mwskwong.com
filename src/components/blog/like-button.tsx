'use client';

import IconButton from '@mui/joy/IconButton';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { FC } from 'react';

import { likeBlog, unlikeBlog } from '@/lib/actions';
import { getBlogMetadataById, hasVisitorLikedBlog } from '@/lib/queries';
import { useFingerprint } from '@/utils/use-fingerprint';

export interface LikeButtonProps extends Omit<StackProps, 'children'> {
  blogId: string;
  like?: number;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const LikeButton: FC<LikeButtonProps> = ({
  blogId,
  like: initialLike,
  ...props
}) => {
  const fingerprint = useFingerprint();
  const queryClient = useQueryClient();

  const { data: like } = useQuery({
    queryKey: ['blogMetadata', 'like', blogId],
    queryFn: async () => (await getBlogMetadataById(blogId))?.like,
    initialData: initialLike,
  });

  const { data: liked } = useQuery({
    queryKey: ['blogMetadata', 'liked', fingerprint?.visitorId, blogId],
    queryFn: () => hasVisitorLikedBlog(fingerprint?.visitorId ?? '', blogId),
    enabled: Boolean(fingerprint?.visitorId),
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      visitorId,
      blogId,
    }: {
      visitorId: string;
      blogId: string;
    }) => {
      if (liked) {
        await unlikeBlog(visitorId, blogId);
      } else {
        await likeBlog(visitorId, blogId);
      }
    },
    // optimistic update like and liked
    onMutate: async ({ visitorId, blogId }) => {
      await queryClient.cancelQueries({ queryKey: ['blogMetadata'] });

      const likeKey = ['blogMetadata', 'like', blogId];
      const likedKey = ['blogMetadata', 'liked', visitorId, blogId];

      const prevLike = queryClient.getQueryData<number>(likeKey);
      const prevLiked = queryClient.getQueryData<boolean>(likedKey);

      queryClient.setQueryData<number>(
        likeKey,
        (old) => (old ?? 0) + (prevLiked ? -1 : 1),
      );
      queryClient.setQueryData<boolean>(likedKey, (old) => !old);

      return { prevLike, prevLiked };
    },
    onError: (_, { visitorId, blogId }, context) => {
      queryClient.setQueryData(
        ['blogMetadata', 'like', blogId],
        context?.prevLike,
      );
      queryClient.setQueryData(
        ['blogMetadata', 'liked', visitorId, blogId],
        context?.prevLiked,
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['blogMetadata'] }),
  });

  return (
    <Stack alignItems="center" direction="row" {...props}>
      <IconButton
        color={liked ? 'danger' : undefined}
        onClick={() =>
          mutate({ visitorId: fingerprint?.visitorId ?? '', blogId })
        }
      >
        <Heart />
      </IconButton>
      <Typography>{numberFormatter.format(like ?? 0)}</Typography>
    </Stack>
  );
};
