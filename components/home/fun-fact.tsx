import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { getTechStack } from '@/lib/queries';

import {
  ColorInversionBox,
  ColorInversionBoxProps,
} from '../color-inversion-box';
import { Logo } from '../contentful';

export type FunFactProps = Partial<Omit<ColorInversionBoxProps, 'children'>>;
export const FunFact: FC<FunFactProps> = async (props) => {
  const techStack = await getTechStack();

  return (
    <ColorInversionBox
      color="primary"
      component="section"
      variant="solid"
      {...props}
    >
      <Container
        sx={{
          color: 'var(--variant-plainColor)',
          '& ::selection': {
            bgcolor: 'var(--variant-softBg)',
          },
        }}
      >
        <Stack alignItems={{ sm: 'center' }} spacing={8} textAlign="center">
          <Stack spacing={2}>
            <Typography level="h2">Fun Fact</Typography>
            <Typography maxWidth="sm">
              This website&apos;s functionality is enabled by these specific
              software packages and platforms.
            </Typography>
          </Stack>
          <Grid
            container
            disableEqualOverflow
            justifyContent="center"
            spacing={6}
          >
            {techStack.map(({ id, name, url }) => (
              <Grid key={name} sm={3} xs={6}>
                <Stack alignItems="center" position="relative" spacing={2}>
                  <Logo
                    colorScheme="light"
                    contentfulId={id}
                    height={40}
                    width={40}
                  />
                  <Link
                    color="neutral"
                    href={url}
                    maxWidth="20ch"
                    overlay
                    target="_blank"
                    typography="title-md"
                  >
                    {name}
                  </Link>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Typography>...and more</Typography>
          <Button
            component="a"
            href="https://github.com/mwskwong/resume"
            size="lg"
            target="_blank"
          >
            See The Source Code
          </Button>
        </Stack>
      </Container>
    </ColorInversionBox>
  );
};
