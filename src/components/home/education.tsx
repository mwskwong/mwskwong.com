import { Box, type BoxProps, Container, Stack, Typography } from '@mui/joy';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getCourses, getEducations } from '@/lib/queries';

import { SelfLearning } from './self-learning';
import { Timeline, TimelineItem } from './timeline';

export type EducationProps = Omit<BoxProps<'section'>, 'children'>;
export const Education: FC<EducationProps> = async (props) => {
  const [educations, courses] = await Promise.all([
    getEducations().then((educations) =>
      educations.map(
        ({ from, to, program, school, grade, supportingDocuments }) => ({
          from: new Date(from),
          to: to && new Date(to),
          title: program,
          organization: school,
          descriptions: grade ? [grade] : undefined,
          supportingDocuments,
        }),
      ),
    ),
    getCourses(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography
            id={routes.education.hash}
            level="h2"
            sx={{ textAlign: 'center' }}
          >
            Education
          </Typography>
          <Timeline>
            {educations.map((education) => (
              <TimelineItem key={education.title} {...education} />
            ))}
          </Timeline>
          <SelfLearning courses={courses} />
        </Stack>
      </Container>
    </Box>
  );
};
