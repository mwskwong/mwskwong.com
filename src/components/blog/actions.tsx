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
import {
  FC,
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useState,
} from 'react';

import { incrBlogView, likeBlog, unlikeBlog } from '@/app/actions';

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export interface ActionsProps extends StackProps {
  id: string;
  view?: number;
  like?: number;
}

export const Actions: FC<ActionsProps> = ({
  id,
  view = 0,
  like = 0,
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const [optimisticLike, setOptimisticLike] = useOptimistic<{
    count: number;
    liked: boolean;
  }>({ count: like, liked: false });

  useEffect(() => void incrBlogView(id), [id]);

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
      <Stack
        action={async () => {
          const action = optimisticLike.liked ? unlikeBlog : likeBlog;
          setOptimisticLike(({ count, liked }) => ({
            count: count + (liked ? -1 : 1),
            liked: !liked,
          }));
          await action(id);
        }}
        alignItems="center"
        component="form"
        direction="row"
        spacing={0.5}
      >
        <IconButton
          aria-label={optimisticLike.liked ? 'unlike blog' : 'like blog'}
          color={optimisticLike.liked ? 'danger' : undefined}
          type="submit"
        >
          {optimisticLike.liked ? (
            <FavoriteRounded />
          ) : (
            <FavoriteBorderRounded />
          )}
        </IconButton>
        <Typography>{numberFormatter.format(optimisticLike.count)}</Typography>
      </Stack>
      <IconButton
        aria-label="copy blog url"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied ? <DoneRounded /> : <ContentCopyRounded />}
      </IconButton>
      <IconButton sx={{ ml: -0.5 }}>
        <ShareRounded />
      </IconButton>
    </Stack>
  );
};
