'use client';

import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { applySolidInversion } from '@mui/joy/colorInversion';
import { Theme } from '@mui/joy/styles';
import { ChevronRight } from 'lucide-react';
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
