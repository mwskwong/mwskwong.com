'use client';

import {
  Box,
  BoxProps,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Theme,
  Typography,
} from '@mui/joy';
import { applySolidInversion } from '@mui/joy/colorInversion';
import { ChevronRight } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

import { websiteTechStack } from '@/constants/content';

export type FunFactProps = Omit<BoxProps<'section'>, 'children'>;
export const FunFact: FC<FunFactProps> = ({ sx, ...props }) => (
  <Box
    bgcolor="primary.solidBg"
    component="section"
    sx={mergeSx<Theme>(applySolidInversion('primary'), sx)}
    {...props}
  >
    <Container
      sx={{
        color: 'var(--variant-plainColor)',
        '& ::selection': {
          bgcolor: 'var(--variant-solidBg)',
          color: 'var(--variant-solidColor)',
        },
      }}
    >
      <Stack alignItems={{ sm: 'center' }} spacing={8} textAlign="center">
        <Stack spacing={2}>
          <Typography level="h2">Fun Fact</Typography>
          <Typography>
            This website is powered by the following packages and platforms.
          </Typography>
        </Stack>
        <Grid
          container
          disableEqualOverflow
          justifyContent="center"
          spacing={6}
        >
          {websiteTechStack.map(({ name, Icon, url }) => (
            <Grid key={name} sm={3} xs={6}>
              <Stack
                alignItems="center"
                position="relative"
                spacing={2}
                sx={{ '--Icon-fontSize': (theme) => theme.vars.fontSize.xl5 }}
              >
                <Icon />
                <Link href={url} overlay target="_blank" typography="title-md">
                  {name}
                </Link>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography>...and more</Typography>
        <Button
          component="a"
          endDecorator={<ChevronRight />}
          href="https://github.com/mwskwong/resume"
          size="lg"
          target="_blank"
        >
          See The Source Code
        </Button>
      </Stack>
    </Container>
  </Box>
);
