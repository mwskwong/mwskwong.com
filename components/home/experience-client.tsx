"use client";

import { Box, BoxProps, Container, Stack, Typography } from "@mui/joy";
import { FC } from "react";

import { experience } from "@/constants/nav";

import Timeline from "./timeline";

type Props = BoxProps<"section">;

const ExperienceClient: FC<Props> = ({ ...props }) => {
  return (
    <Box component="section" id={experience.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" sx={{ textAlign: "center" }}>
            Experience
          </Typography>
          <Timeline />
        </Stack>
      </Container>
    </Box>
  );
};

export default ExperienceClient;
