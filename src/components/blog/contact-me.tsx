'use client';

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
import { ChevronRight } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import NextLink from 'next/link';
import { FC } from 'react';

import { contact } from '@/constants/nav';

export type ContactMeProps = Omit<BoxProps, 'children'>;
export const ContactMe: FC<ContactMeProps> = ({ sx, ...props }) => (
  <Box
    bgcolor="primary.600"
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
      <Stack alignItems={{ sm: 'center' }} spacing={8} textAlign="center">
        <Typography level="h2">Any Questions or Comments?</Typography>
        <Button
          component={NextLink}
          endDecorator={<ChevronRight />}
          href={contact.href}
          size="lg"
        >
          Contact Me
        </Button>
      </Stack>
    </Container>
  </Box>
);
