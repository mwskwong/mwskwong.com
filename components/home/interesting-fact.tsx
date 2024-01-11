import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { getTechStack } from '@/lib/queries';

import { Logo } from '../contentful';

export type InterestingFactProps = Omit<BoxProps<'section'>, 'children'>;
export const InterestingFact: FC<InterestingFactProps> = async (props) => {
  const techStack = await getTechStack();

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack alignItems={{ sm: 'center' }} spacing={8} textAlign="center">
          <Stack spacing={2}>
            <Typography level="h2">Interesting Fact</Typography>
            <Typography maxWidth="sm">
              This website is built on top of the following libraries and
              platforms.
            </Typography>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            spacing={2}
          >
            {techStack.map(({ id, name, url }) => (
              <Tooltip key={id} title={name}>
                <Link href={url} target="_blank">
                  <Logo
                    colorScheme="light"
                    contentfulId={id}
                    height={36}
                    width={36}
                  />
                </Link>
              </Tooltip>
            ))}
          </Stack>
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
    </Box>
  );
};
