'use client';

import { Link, Typography, TypographyProps, typographyClasses } from '@mui/joy';
import { LinkIcon } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

export type HeadingProps = TypographyProps;
export const Heading: FC<HeadingProps> = ({ id, sx, ...props }) => (
  <Typography
    endDecorator={
      <Link
        aria-labelledby={id}
        borderRadius="sm"
        href={`#${id}`}
        level="body-md"
        variant="outlined"
      >
        <LinkIcon />
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
