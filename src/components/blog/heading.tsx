'use client';

import {
  IconButton,
  Typography,
  TypographyProps,
  typographyClasses,
} from '@mui/joy';
import { LinkIcon } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

export type HeadingProps = TypographyProps;
export const Heading: FC<HeadingProps> = ({ id, sx, ...props }) => (
  <Typography
    endDecorator={
      <IconButton
        aria-labelledby={id}
        color="primary"
        component="a"
        href={`#${id}`}
        size="sm"
      >
        <LinkIcon />
      </IconButton>
    }
    id={id}
    sx={mergeSx(
      {
        [`& .${typographyClasses.endDecorator}`]: {
          visibility: 'hidden',
        },
        '&:hover': {
          [`& .${typographyClasses.endDecorator}`]: {
            visibility: 'unset',
          },
        },
      },
      sx,
    )}
    {...props}
  />
);
