"use client";

import { IconType } from "@icons-pack/react-simple-icons/types";
import { ClearRounded, SearchRounded } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Card,
  Container,
  Grid,
  IconButton,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { LazyMotion, m } from "framer-motion";
import { FC, useDeferredValue, useMemo, useState } from "react";

import { education } from "@/constants/nav";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";
import loadFramerMotionFeatures from "@/utils/load-framer-motion-features";

import Timeline from "./timeline";
import TimelineItem from "./timeline-item";

const MotionGrid = m(Grid);

interface Props extends BoxProps<"section"> {
  educations: {
    from: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    to?: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    program: string;
    school?: {
      name: string;
      url?: string;
    };
    supportingDocuments?: {
      title: string;
      url: string;
    }[];
  }[];
  courses: {
    institution?: {
      id: string;
      name: string;
    };
    certificate?: string;
    name: string;
  }[];
}

const EducationClient: FC<Props> = ({
  educations: educationsProp,
  courses,
  ...props
}) => {
  const educations = educationsProp.map(
    ({ from, to, program, school, ...rest }) => ({
      from: new Date(from),
      to: to && new Date(to),
      title: program,
      organizations: school && [school],
      ...rest,
    })
  );

  const [courseSearch, setCourseSearch] = useState("");
  const deferredCourseSearch = useDeferredValue(courseSearch);
  const filteredCourses = useMemo(
    () =>
      courses.filter(({ name, institution }) => {
        const searchStr = deferredCourseSearch.toLowerCase();
        return (
          name.toLowerCase().includes(searchStr) ||
          institution?.name.toLowerCase().includes(searchStr)
        );
      }),
    [courses, deferredCourseSearch]
  );

  return (
    <Box component="section" id={education.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" sx={{ textAlign: "center" }}>
            Education
          </Typography>
          <Timeline>
            {educations.map((education) => (
              <TimelineItem key={education.title} {...education} />
            ))}
          </Timeline>
          <Stack spacing={2}>
            <Input
              size="lg"
              placeholder="Search courses..."
              startDecorator={<SearchRounded />}
              endDecorator={
                courseSearch.length > 0 && (
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => setCourseSearch("")}
                  >
                    <ClearRounded />
                  </IconButton>
                )
              }
              sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
              value={courseSearch}
              onChange={(event) => setCourseSearch(event.target.value)}
            />
            <LazyMotion features={loadFramerMotionFeatures}>
              <Grid container spacing={2}>
                {filteredCourses.map(({ name, institution, certificate }) => {
                  const Icon =
                    institution &&
                    (getIconByContentfulId(institution.id) as IconType);

                  return (
                    <MotionGrid key={name} xs={12} md={6} layout>
                      <Card
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          "--Icon-fontSize": (theme) => theme.vars.fontSize.xl4,
                          "&:hover": {
                            boxShadow: "md",
                            borderColor: "neutral.outlinedHoverBorder",
                          },
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 45,
                          }}
                        >
                          {Icon && <Icon color="default" />}
                        </Box>
                        <Box>
                          <Link
                            component={certificate ? "a" : "button"}
                            overlay
                            underline="none"
                            href={certificate}
                            target="_blank"
                            sx={{ color: "inherit" }}
                          >
                            {name}
                          </Link>
                          <Typography level="body2">
                            {institution?.name}
                          </Typography>
                        </Box>
                      </Card>
                    </MotionGrid>
                  );
                })}
              </Grid>
            </LazyMotion>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default EducationClient;
