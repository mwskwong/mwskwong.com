import Box, { BoxProps } from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

import { education } from "@/constants/nav";
import getCourses from "@/lib/get-courses";
import getEducations from "@/lib/get-educations";

import SelfLearning from "./self-learning";
import Timeline from "./timeline";
import TimelineItem from "./timeline-item";

const Education: FC<Omit<BoxProps<"section">, "children">> = async (props) => {
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
    <Box component="section" id={education.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" textAlign="center">
            Education
          </Typography>
          <Timeline>
            {educations.map((education) => (
              <TimelineItem key={education.title} {...education} />
            ))}
          </Timeline>
          <Stack spacing={2} textAlign="center" alignItems="center">
            <Typography level="h3" textAlign="center">
              Self-learning
            </Typography>
            <Box component="figure" maxWidth="60ch">
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

export default Education;
