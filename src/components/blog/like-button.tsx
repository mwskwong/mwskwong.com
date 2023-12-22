'use client';

import IconButton from '@mui/joy/IconButton';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { FC } from 'react';
import { useLocalStorage } from 'react-use';

import { likeBlog, unlikeBlog } from '@/lib/actions';
import { getBlogMetadataById, hasVisitorLikedBlog } from '@/lib/queries';

export interface LikeButtonProps extends Omit<StackProps, 'children'> {
  blogId: string;
  like?: number;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });
const blogMetadataKeys = {
  all: ['blogMetadata'] as const,
  byId: (blogId: string) => [...blogMetadataKeys.all, blogId] as const,
  like: (blogId: string) => [...blogMetadataKeys.byId(blogId), 'like'] as const,
  liked: (blogId: string, visitorId: string) =>
    [...blogMetadataKeys.byId(blogId), visitorId, 'liked'] as const,
};

export const LikeButton: FC<LikeButtonProps> = ({
  blogId,
  like: initialLike,
  ...props
}) => {
  const [visitorId = ''] = useLocalStorage('visitorId', crypto.randomUUID());
  const queryClient = useQueryClient();

  const { data: like } = useQuery({
    queryKey: blogMetadataKeys.like(blogId),
    queryFn: async () => (await getBlogMetadataById(blogId))?.like,
    initialData: initialLike,
  });

  const { data: liked } = useQuery({
    queryKey: blogMetadataKeys.liked(blogId, visitorId),
    queryFn: () => hasVisitorLikedBlog(blogId, visitorId),
    enabled: Boolean(visitorId),
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
        await unlikeBlog(blogId, visitorId);
      } else {
        await likeBlog(blogId, visitorId);
      }
    },
    // optimistic update like/unlike blog
    onMutate: async ({ visitorId, blogId }) => {
      await queryClient.cancelQueries({ queryKey: ['blogMetadata'] });

      const prevLike = queryClient.getQueryData<number>(
        blogMetadataKeys.like(blogId),
      );
      const prevLiked = queryClient.getQueryData<boolean>(
        blogMetadataKeys.liked(blogId, visitorId),
      );

      queryClient.setQueryData<number>(
        blogMetadataKeys.like(blogId),
        (like) => (like ?? 0) + (prevLiked ? -1 : 1),
      );
      queryClient.setQueryData<boolean>(
        blogMetadataKeys.liked(blogId, visitorId),
        (liked) => !liked,
      );

      return { prevLike, prevLiked };
    },
    // rollback if mutation failed
    onError: (_, { visitorId, blogId }, context) => {
      queryClient.setQueryData(
        blogMetadataKeys.like(blogId),
        context?.prevLike,
      );
      queryClient.setQueryData(
        blogMetadataKeys.liked(blogId, visitorId),
        context?.prevLiked,
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: blogMetadataKeys.byId(blogId),
      }),
  });

  return (
    <Stack alignItems="center" direction="row" {...props}>
      <IconButton
        aria-label={liked ? 'Unlike this blog' : 'Like this blog'}
        color={liked ? 'danger' : undefined}
        onClick={() => {
          if (visitorId) {
            mutate({ visitorId, blogId });
          }
        }}
      >
        <Heart />
      </IconButton>
      <Typography>{numberFormatter.format(like ?? 0)}</Typography>
    </Stack>
  );
};
