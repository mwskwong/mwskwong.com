import { Box, BoxProps, Container, Stack, Typography } from '@mui/joy';
import { FC } from 'react';

import { experiences as experiencesSection } from '@/constants/nav';
import { getExperiences } from '@/lib/get-experiences';

import { Timeline, TimelineItem } from './timeline';

export type ExperienceProps = Omit<BoxProps<'section'>, 'children'>;
export const Experiences: FC<ExperienceProps> = async (props) => {
  const experiences = await getExperiences().then((experiences) =>
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
  );

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography id={experiencesSection.id} level="h2" textAlign="center">
            Experiences
          </Typography>
          <Timeline>
            {experiences.map((experiences) => (
              <TimelineItem key={experiences.title} {...experiences} />
            ))}
          </Timeline>
        </Stack>
      </Container>
    </Box>
  );
};
