import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
// eslint-disable-next-line camelcase -- Next.js naming convention
import { unstable_cache } from 'next/cache';
import { FC } from 'react';

import { education } from '@/constants/nav';
import { courseTags, educationTags } from '@/lib/cache-tags';
import { getCourses } from '@/lib/get-courses';
import { getEducations } from '@/lib/get-educations';

import { SelfLearning } from './self-learning';
import { Timeline, TimelineItem } from './timeline';

export type EducationProps = Omit<BoxProps<'section'>, 'children'>;
export const Education: FC<EducationProps> = async (props) => {
  const [educations, courses] = await Promise.all([
    unstable_cache(getEducations, [], { tags: educationTags.lists() })().then(
      (educations) =>
        educations.map(
          ({ from, to, program, school, supportingDocuments }) => ({
            from: new Date(from),
            to: to && new Date(to),
            title: program,
            organizations: school && [school],
            supportingDocuments,
          }),
        ),
    ),
    unstable_cache(getCourses, [], { tags: courseTags.lists() })(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography id={education.id} level="h2" textAlign="center">
            Education
          </Typography>
          <Timeline>
            {educations.map((education) => (
              <TimelineItem key={education.title} {...education} />
            ))}
          </Timeline>
          <Stack alignItems="center" spacing={2} textAlign="center">
            <Typography level="h3" textAlign="center">
              Self-learning
            </Typography>
            <Box component="figure" maxWidth="sm">
              <Typography component="blockquote">
                Stay hungry. Stay foolish. Never let go of your appetite to go
                after new ideas, new experiences, and new adventures.
              </Typography>
              <Typography component="figcaption">― Steve Jobs</Typography>
            </Box>
          </Stack>
          <SelfLearning courses={courses} />
        </Stack>
      </Container>
    </Box>
  );
};
