'use client';

import {
  ContentCopyRounded,
  DoneRounded,
  FavoriteBorderRounded,
  ShareRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC, useEffect, useState } from 'react';

import { incrBlogView } from '@/app/actions';

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
      <Stack alignItems="center" direction="row" spacing={0.5}>
        <IconButton>
          <FavoriteBorderRounded />
        </IconButton>
        <Typography>{numberFormatter.format(like)}</Typography>
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
