import { Box, BoxProps, Container, Stack, Typography } from "@mui/joy";

import { experience } from "@/constants/nav";
import { getExperiences } from "@/lib";

import Timeline from "./timeline";
import TimelineItem from "./timeline-item";

const Experience = async (props: BoxProps<"section">) => {
  const experiences = (await getExperiences()).map(
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
    })
  );

  return (
    <Box component="section" id={experience.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" sx={{ textAlign: "center" }}>
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

export default Experience;
