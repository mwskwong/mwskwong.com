'use client';

import IconButton from '@mui/joy/IconButton';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Heart } from 'lucide-react';
import { FC } from 'react';

export interface LikeButtonProps extends Omit<StackProps, 'children'> {
  blogId: string;
  like?: number;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: implement onclick
export const LikeButton: FC<LikeButtonProps> = ({ blogId, like, ...props }) => {
  return (
    <Stack alignItems="center" direction="row" {...props}>
      <IconButton>
        <Heart />
      </IconButton>
      <Typography>{numberFormatter.format(like ?? 0)} likes</Typography>
    </Stack>
  );
};
