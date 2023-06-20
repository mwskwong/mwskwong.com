"use client";

import { Box, BoxProps, Container, Stack, Typography } from "@mui/joy";
import { FC } from "react";

import { experience } from "@/constants/nav";

import Timeline from "./timeline";
import TimelineItem from "./timeline-item";

interface Props extends BoxProps<"section"> {
  experiences: {
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

const ExperienceClient: FC<Props> = ({
  experiences: experiencesProp,
  ...props
}) => {
  const experiences = experiencesProp.map(
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

export default ExperienceClient;
