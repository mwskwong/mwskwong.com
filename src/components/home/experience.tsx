import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import {
  prismaReadReplicasExtension,
  vercelStyleGuide,
} from '@/constants/contentful-ids';
import { experience } from '@/constants/nav';
import { SiPrismaHexDark, SiVercelHexDark } from '@/constants/simple-icons';
import { getContributedProjects, getExperiences } from '@/lib/queries';
import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

import { Timeline, TimelineItem } from './timeline';

const darkModeIconColors = {
  [prismaReadReplicasExtension]: SiPrismaHexDark,
  [vercelStyleGuide]: SiVercelHexDark,
};

export type ExperienceProps = Omit<BoxProps<'section'>, 'children'>;
export const Experience: FC<ExperienceProps> = async (props) => {
  const [experiences, contributedProjects] = await Promise.all([
    getExperiences().then((experiences) =>
      experiences.map(
        ({
          from,
          to,
          jobTitle,
          companies,
          companiesRelationship,
          jobDuties,
          skills,
          ...rest
        }) => ({
          from: new Date(from),
          to: to && new Date(to),
          title: jobTitle,
          organizations: companies,
          organizationsRelationship: companiesRelationship,
          descriptions: jobDuties,
          tags: skills,
          ...rest,
        }),
      ),
    ),
    getContributedProjects(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography id={experience.id} level="h2" textAlign="center">
            Experience
          </Typography>
          <Timeline>
            {experiences.map((experience) => (
              <TimelineItem key={experience.title} {...experience} />
            ))}
          </Timeline>
          <Stack spacing={6} textAlign="center">
            <Stack alignItems="center" spacing={2}>
              <Typography level="h3">
                Contribution To Open Source Projects
              </Typography>
              <Typography maxWidth="sm">
                Periodically, I engage in open-source contributions. Below are
                the projects I&apos;ve contributed to thus far.
              </Typography>
            </Stack>
            <Grid
              container
              disableEqualOverflow
              justifyContent="center"
              spacing={6}
            >
              {contributedProjects.map(({ id, name, url }) => {
                const Icon = getIconByContentfulId(id);
                return (
                  <Grid key={name} sm={3} xs={6}>
                    <Stack
                      alignItems="center"
                      position="relative"
                      spacing={2}
                      sx={{
                        '--Icon-fontSize': 'var(--joy-fontSize-xl5)',
                        // make use of light color for Vercel and Prisma icon when in dark mode
                        // because both of them are having a dark color by default
                        '[data-joy-color-scheme="dark"] &': {
                          '& > svg': {
                            fill:
                              id in darkModeIconColors
                                ? darkModeIconColors[
                                    id as keyof typeof darkModeIconColors
                                  ]
                                : undefined,
                          },
                        },
                      }}
                    >
                      {Icon ? <Icon color="default" /> : null}
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
                );
              })}
            </Grid>
            <Typography>...and more to come</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
