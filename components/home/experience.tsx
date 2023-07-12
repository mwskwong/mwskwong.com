"use client";

import { Box, BoxProps, Container, Stack, Typography } from "@mui/joy";
import { FC } from "react";

import { experience } from "@/constants/nav";

import Timeline from "./timeline";
import TimelineItem from "./timeline-item";

interface Props extends BoxProps<"section"> {
  experiences?: {
    from: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    to?: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    jobTitle: string;
    companies: {
      name: string;
      url?: string;
    }[];
    companiesRelationship?: string;
    jobDuties?: string[];
    supportingDocuments?: {
      title: string;
      url: string;
    }[];
    skills: string[];
  }[];
}

// TODO: move this to server component once nested Grid is supported
const Experience: FC<Props> = ({
  experiences: experiencesProps = [],
  ...props
}) => {
  const experiences = experiencesProps.map(
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
