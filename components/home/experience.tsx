import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';
import { experience } from '@/constants/nav';
import getExperiences from '@/lib/get-experiences';
import { Timeline, TimelineItem } from './timeline';

export type ExperienceProps = Omit<BoxProps<'section'>, 'children'>;

export const Experience: FC<ExperienceProps> = async (props) => {
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
        supportingDocuments,
      }) => ({
        from: new Date(from),
        to: to && new Date(to),
        title: jobTitle,
        organizations: companies,
        organizationsRelationship: companiesRelationship,
        descriptions: jobDuties,
        tags: skills,
        supportingDocuments,
      }),
    ),
  );

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography id={experience.id} level="h2" textAlign="center">
            Experience
          </Typography>
          <Timeline>
            {experiences.map((experience) => (
              <TimelineItem key={experience.title} {...experience} />
            ))}
          </Timeline>
        </Stack>
      </Container>
    </Box>
  );
};
