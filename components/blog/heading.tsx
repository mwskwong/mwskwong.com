'use client';

import { LinkRounded } from '@mui/icons-material';
import Link from '@mui/joy/Link';
import Typography, {
  TypographyProps,
  typographyClasses,
} from '@mui/joy/Typography';
import { kebabCase } from 'lodash-es';
import mergeSx from 'merge-sx';
import { FC } from 'react';

export type HeadingProps = TypographyProps;

// FIXME: with zero runtime, we may be able to make this a server component
export const Heading: FC<HeadingProps> = ({ sx, ...props }) => {
  const hash =
    typeof props.children === 'string' ? kebabCase(props.children) : undefined;

  return (
    <Typography
      endDecorator={
        <Link
          aria-labelledby={hash}
          borderRadius="sm"
          href={`#${hash}`}
          level="body-md"
          variant="outlined"
        >
          <LinkRounded />
        </Link>
      }
      id={hash}
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
