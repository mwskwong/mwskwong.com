'use client'; // FIXME: for the sake of accessing typographyClasses, may not be needed once zero CSS runtime is in place

import Link from '@mui/joy/Link';
import Typography, {
  TypographyProps,
  typographyClasses,
} from '@mui/joy/Typography';
import { LinkIcon } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

export type HeadingProps = TypographyProps;
export const Heading: FC<HeadingProps> = ({ id, sx, children, ...props }) => (
  <Typography
    endDecorator={<LinkIcon />}
    id={id}
    sx={mergeSx(
      {
        [`& .${typographyClasses.endDecorator}`]: {
          display: { xs: 'none', md: 'unset' },
          visibility: 'hidden',
          '--Icon-fontSize': (theme) => theme.vars.fontSize.xl2,
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
  >
    <Link color="neutral" href={`#${id}`} textColor="inherit">
      {children}
    </Link>
  </Typography>
);
