import { SiLinkedin } from '@icons-pack/react-simple-icons';
import {
  Box,
  BoxProps,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/joy';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import { FC } from 'react';

import { firstName, headline, lastName } from '@/constants/content';
import { linkedin } from '@/constants/contentful-ids';
import { blog } from '@/constants/nav';
import { getCv, getPlatformProfiles } from '@/lib/queries';

export type HeroProps = Omit<BoxProps<'section'>, 'children'>;
export const Hero: FC<HeroProps> = async (props) => {
  const [cv, linkedinProfile] = await Promise.all([
    getCv(),
    getPlatformProfiles().then((platformProfiles) =>
      platformProfiles.find(({ platform }) => platform?.id === linkedin),
    ),
  ]);

  return (
    <Box component="section" pt={{ sm: 16 }} {...props}>
      <Container sx={{ textAlign: 'center' }}>
        <Stack alignItems="center" spacing={2}>
          <Chip
            endDecorator={
              <Typography
                color="primary"
                endDecorator={<ArrowRight />}
                fontWeight="lg"
                level="title-sm"
              >
                Read more
              </Typography>
            }
            slotProps={{ action: { component: NextLink, href: blog.pathname } }}
            variant="outlined"
          >
            I started writing articles.
          </Chip>
          <Typography level="h1">
            {"I'm "}
            <Typography color="primary">{firstName}</Typography> {lastName}
          </Typography>
          <Typography level="title-lg">{headline}</Typography>
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          mt={6}
          spacing={2}
        >
          <Button component="a" href={cv} size="lg" target="_blank">
            Download CV
          </Button>
          <Button
            color="neutral"
            component="a"
            href={linkedinProfile?.url}
            size="lg"
            startDecorator={<SiLinkedin />}
            target="_blank"
            variant="outlined"
          >
            {linkedinProfile?.platform?.name}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
