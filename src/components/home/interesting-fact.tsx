import {
  Box,
  type BoxProps,
  Button,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/joy';
import { type FC } from 'react';

import { getTechStack } from '@/lib/queries';

import { Logo } from '../contentful';

export type InterestingFactProps = Omit<BoxProps<'section'>, 'children'>;
export const InterestingFact: FC<InterestingFactProps> = async (props) => {
  const techStack = await getTechStack();

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack
          spacing={8}
          sx={{ alignItems: { sm: 'center' }, textAlign: 'center' }}
        >
          <Stack spacing={2}>
            <Typography level="h2">Interesting Fact</Typography>
            <Typography sx={{ maxWidth: 'sm' }}>
              My website is a testing ground for bleeding-edge techs and design
              patterns. Check out the libraries and platforms I use to build it.
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {techStack.map(({ id, name, url }) => (
              <Tooltip key={id} title={name}>
                <Link href={url} target="_blank">
                  <Logo
                    alt={name}
                    colorScheme="light"
                    contentfulId={id}
                    height={36}
                    sx={{ objectFit: 'scale-down' }}
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
