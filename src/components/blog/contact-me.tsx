'use client';

import { KeyboardArrowRightRounded } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  Container,
  Stack,
  Theme,
  Typography,
} from '@mui/joy';
import { applySolidInversion } from '@mui/joy/colorInversion';
import { mergeSx } from 'merge-sx';
import NextLink from 'next/link';
import { FC } from 'react';

import { contact } from '@/constants/nav';

export type ContactMeProps = Omit<BoxProps, 'children'>;
export const ContactMe: FC<ContactMeProps> = ({ sx, ...props }) => (
  <Box
    bgcolor="primary.solidBg"
    component="section"
    sx={mergeSx<Theme>(applySolidInversion('primary'), sx)}
    {...props}
  >
    <Container
      sx={{
        '& ::selection': {
          bgcolor: 'var(--variant-solidBg)',
          color: 'var(--variant-solidColor)',
        },
      }}
    >
      <Stack alignItems={{ sm: 'center' }} spacing={6} textAlign="center">
        <Typography level="h2">Any Questions or Comments?</Typography>
        <Button
          component={NextLink}
          endDecorator={<KeyboardArrowRightRounded />}
          href={contact.href}
          size="lg"
        >
          Contact Me
        </Button>
      </Stack>
    </Container>
  </Box>
);
