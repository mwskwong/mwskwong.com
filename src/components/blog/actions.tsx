'use client';

import {
  ContentCopyRounded,
  DoneRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  ShareRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC, useEffect, useState } from 'react';

import { incrBlogView, likeBlog, unlikeBlog } from '@/app/actions';
import { firstName, lastName } from '@/constants/content';

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export interface ActionsProps extends StackProps {
  blog: {
    id: string;
    title: string;
  };
  view?: number;
  like?: number;
}

export const Actions: FC<ActionsProps> = ({
  blog,
  view = 0,
  like = 0,
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const [optimisticLike, setOptimisticLike] = useState(like);
  const [optimisticLiked, setOptimisticLiked] = useState(false);

  useEffect(() => void incrBlogView(blog.id), [blog.id]);

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-around"
      spacing={1}
      {...props}
    >
      <Stack alignItems="center" direction="row" spacing={1}>
        <VisibilityRounded />
        <Typography>{numberFormatter.format(view)}</Typography>
      </Stack>
      <Stack alignItems="center" component="form" direction="row">
        <IconButton
          aria-label={optimisticLiked ? 'unlike blog' : 'like blog'}
          color={optimisticLiked ? 'danger' : undefined}
          onClick={async () => {
            const prevLiked = optimisticLiked;
            // FIXME: make use of useOptimistic when official doc is available
            try {
              setOptimisticLike((prev) => prev + (prevLiked ? -1 : 1));
              setOptimisticLiked((prev) => !prev);
              await (prevLiked ? unlikeBlog(blog.id) : likeBlog(blog.id));
            } catch (error) {
              setOptimisticLike((prev) => prev + (prevLiked ? 1 : -1));
              setOptimisticLiked(prevLiked);
            }
          }}
        >
          {optimisticLiked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
        </IconButton>
        <Typography>{numberFormatter.format(optimisticLike)}</Typography>
      </Stack>
      <IconButton
        aria-label="copy blog url"
        color={copied ? 'success' : undefined}
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied ? <DoneRounded /> : <ContentCopyRounded />}
      </IconButton>
      <IconButton
        onClick={() =>
          navigator.share({
            url: window.location.href,
            text: `${blog.title} by ${firstName} ${lastName}`,
            title: blog.title,
          })
        }
        sx={{ ml: -0.5 }}
      >
        <ShareRounded />
      </IconButton>
    </Stack>
  );
};
