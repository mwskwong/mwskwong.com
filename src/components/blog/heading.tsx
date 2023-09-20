'use client';

import { LinkRounded } from '@mui/icons-material';
import Link from '@mui/joy/Link';
import Typography, {
  TypographyProps,
  typographyClasses,
} from '@mui/joy/Typography';
import mergeSx from 'merge-sx';
import { FC } from 'react';

export type HeadingProps = TypographyProps;

// FIXME: with zero runtime, we may be able to make this a server component
export const Heading: FC<HeadingProps> = ({ id, sx, ...props }) => {
  return (
    <Typography
      endDecorator={
        <Link
          aria-labelledby={id}
          borderRadius="sm"
          href={`#${id}`}
          level="body-md"
          variant="outlined"
        >
          <LinkRounded />
        </Link>
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
};
