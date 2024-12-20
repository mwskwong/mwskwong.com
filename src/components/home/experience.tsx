import {
  Box,
  type BoxProps,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/joy';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getContributedProjects, getExperiences } from '@/lib/queries';

import { Logo } from '../logo';

import { Timeline, TimelineItem } from './timeline';

export type ExperienceProps = Omit<BoxProps<'section'>, 'children'>;
export const Experience: FC<ExperienceProps> = async (props) => {
  const [experiences, contributedProjects] = await Promise.all([
    getExperiences().then((experiences) =>
      experiences.map(
        ({ from, to, jobTitle, company, jobDuties, skills, ...rest }) => ({
          from: new Date(from),
          to: to && new Date(to),
          title: jobTitle,
          organization: company,
          descriptions: jobDuties,
          tags: skills.map(({ name, url }) => ({ label: name, url })),
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
          <Typography
            id={routes.experience.hash}
            level="h2"
            sx={{ textAlign: 'center' }}
          >
            Experience
          </Typography>
          <Timeline>
            {experiences.map((experience) => (
              <TimelineItem key={experience.title} {...experience} />
            ))}
          </Timeline>
          <Stack spacing={6} sx={{ textAlign: 'center' }}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <Typography level="h3">
                Contribution To Open Source Projects
              </Typography>
              <Typography sx={{ maxWidth: 'sm' }}>
                Periodically, I engage in open-source contributions. Below are
                the projects I&apos;ve contributed to thus far.
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {contributedProjects.map(({ id, name, url, logo }) => (
                <Tooltip key={id} title={name}>
                  <Link href={url} target="_blank">
                    <Logo
                      alt={name}
                      size="lg"
                      src={logo.universal}
                      srcDark={logo.dark}
                      srcLight={logo.light}
                    />
                  </Link>
                </Tooltip>
              ))}
            </Stack>
            <Typography>...and more to come</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
