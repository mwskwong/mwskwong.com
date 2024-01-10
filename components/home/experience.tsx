import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { experience } from '@/constants/nav';
import { getContributedProjects, getExperiences } from '@/lib/queries';

import { Logo, logoClasses } from '../contentful';

import { Timeline, TimelineItem } from './timeline';

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
              sx={{
                [`& .${logoClasses.colorSchemeLight}`]: {
                  display: 'none',
                },
                '[data-joy-color-scheme="dark"] &': {
                  [`& .${logoClasses.colorSchemeDark}`]: {
                    display: 'none',
                  },
                  [`& .${logoClasses.colorSchemeLight}`]: {
                    display: 'block',
                  },
                },
              }}
            >
              {contributedProjects.map(({ id, name, url }) => (
                <Grid key={id} sm={3} xs={6}>
                  <Stack alignItems="center" position="relative" spacing={2}>
                    <Logo
                      colorScheme="light"
                      contentfulId={id}
                      height={40}
                      width={40}
                    />
                    <Logo
                      colorScheme="dark"
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
            <Typography>...and more to come</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
