import { Box, BoxProps, Container, Stack, Typography } from '@mui/joy';
import { FC } from 'react';

import { educations as educationsSection } from '@/constants/nav';
import { getCourses } from '@/lib/get-courses';
import { getEducations } from '@/lib/get-educations';

import { SelfLearning } from './self-learning';
import { Timeline, TimelineItem } from './timeline';

export type EducationProps = Omit<BoxProps<'section'>, 'children'>;
export const Educations: FC<EducationProps> = async (props) => {
  const [educations, courses] = await Promise.all([
    getEducations().then((educations) =>
      educations.map(({ from, to, program, school, supportingDocuments }) => ({
        from: new Date(from),
        to: to && new Date(to),
        title: program,
        organizations: school && [school],
        supportingDocuments,
      })),
    ),
    getCourses(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography id={educationsSection.id} level="h2" textAlign="center">
            Educations
          </Typography>
          <Timeline>
            {educations.map((educations) => (
              <TimelineItem key={educations.title} {...educations} />
            ))}
          </Timeline>
          <SelfLearning courses={courses} />
        </Stack>
      </Container>
    </Box>
  );
};
