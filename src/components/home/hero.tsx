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
import { mergeSx } from 'merge-sx';
import NextLink from 'next/link';
import { FC } from 'react';

import { firstName, headline, lastName } from '@/constants/content';
import { linkedin } from '@/constants/contentful-ids';
import { blog } from '@/constants/nav';
import { getCv, getPlatformProfiles } from '@/lib/queries';

export type HeroProps = Omit<BoxProps<'section'>, 'children'>;
export const Hero: FC<HeroProps> = async ({ sx, ...props }) => {
  const [cv, linkedinProfile] = await Promise.all([
    getCv(),
    getPlatformProfiles().then((platformProfiles) =>
      platformProfiles.find(({ platform }) => platform?.id === linkedin),
    ),
  ]);

  return (
    <Box
      component="section"
      sx={mergeSx(
        {
          // 10% --> height of the SVG divider
          // divided by 2 --> half of the height, since the 1st half visually belongs to the previous section and the 2nd half visually belongs to the next section
          // further divided 2 --> half of the height again, since the divider shape is a till
          pt: 'calc(10 * var(--joy-spacing) + 10% / 2 / 2)',
        },
        sx,
      )}
      {...props}
    >
      <Container sx={{ textAlign: 'center' }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Chip
            endDecorator={<ArrowRight />}
            variant="outlined"
            slotProps={{
              action: { component: NextLink, href: blog.pathname },
              endDecorator: {
                sx: {
                  '--Icon-color':
                    'rgba(var(--joy-palette-primary-mainChannel) / 1)',
                },
              },
            }}
          >
            I started writing articles.&nbsp;
            <Typography
              color="primary"
              level="inherit"
              sx={{ display: 'inline', fontWeight: 'lg' }}
            >
              Read More
            </Typography>
          </Chip>
          <Typography level="h1">
            {"I'm "}
            <Typography color="primary">{firstName}</Typography> {lastName}
          </Typography>
          <Typography level="title-lg">{headline}</Typography>
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'center', mt: 6 }}
        >
          <Button component="a" href={cv} size="lg" target="_blank">
            Download CV
          </Button>
          <Button
            color="neutral"
            component="a"
            href={linkedinProfile?.url}
            size="lg"
            startDecorator={<SiLinkedin viewBox="-2 -2 28 28" />}
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
