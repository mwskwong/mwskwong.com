"use client";

import { SiLinkedin } from "@icons-pack/react-simple-icons";
import {
  ClearRounded,
  EmailRounded,
  KeyboardArrowRightRounded,
  LocationOnRounded,
  SearchRounded,
  SmartphoneRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  Link,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { FC, useDeferredValue, useMemo, useState } from "react";

import {
  getCv,
  getPersonalPhoto,
  getPlatformProfiles,
  getSkillCategories,
} from "@/api";
import getCourses from "@/api/get-courses";
import CourseCard from "@/components/course-card";
import Image from "@/components/image";
import SectionDivider from "@/components/section-divider";
import SKillCategory from "@/components/skill-category";
import {
  address,
  email,
  firstName,
  jobTitles,
  lastName,
  phone,
  selfIntroduction,
  websiteTechStack,
} from "@/constants/data";
import { about, contact, home } from "@/constants/nav";
import { education } from "@/constants/nav";
import { simpleIconsClasses } from "@/theme";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";
import { contentfulLoader } from "@/utils/image-loaders";

interface Props {
  cv?: Awaited<ReturnType<typeof getCv>>;
  platformProfiles?: Awaited<ReturnType<typeof getPlatformProfiles>>;
  personalPhoto?: Awaited<ReturnType<typeof getPersonalPhoto>>;
  skillCategories?: Awaited<ReturnType<typeof getSkillCategories>>;
  courses?: Awaited<ReturnType<typeof getCourses>>;
}

const personalInfo = [
  {
    Icon: SmartphoneRounded,
    title: "Call Me At",
    value: phone,
    url: `tel:${phone}`,
  },
  {
    Icon: EmailRounded,
    title: "Email Me At",
    value: email,
    url: `mailto:${email}`,
  },
  {
    Icon: LocationOnRounded,
    title: "Find Me At",
    value: address,
    url: "https://www.google.com/maps/place/Hong+Kong",
  },
];

const HomeClient: FC<Props> = ({
  cv,
  platformProfiles = [],
  personalPhoto,
  skillCategories = [],
  courses = [],
}) => {
  const linkedin = useMemo(
    () =>
      platformProfiles.find(
        (profile) => profile.platform?.id === "1pixZwU07yhCdpEdkxGVof"
      ),
    [platformProfiles]
  );

  const [courseSearch, setCourseSearch] = useState("");
  const deferredCourseSearch = useDeferredValue(courseSearch);
  const filteredCourses = useMemo(
    () =>
      courses.filter(
        ({ name, institution }) =>
          name.toLowerCase().includes(deferredCourseSearch.toLowerCase()) ||
          institution?.name
            .toLowerCase()
            .includes(deferredCourseSearch.toLowerCase())
      ),
    [courses, deferredCourseSearch]
  );

  return (
    <>
      <Container component="section" id={home.id} sx={{ pt: { sm: 16 } }}>
        <Stack spacing={5} sx={{ justifyContent: "center" }}>
          <Stack spacing={2} sx={{ textAlign: "center" }}>
            <Divider
              component="div"
              role="presentation"
              sx={{
                textTransform: "uppercase",
                width: 120,
                mx: "auto",
              }}
            >
              Hello
            </Divider>
            <Typography level="h1">
              {"I'm "}
              <Typography color="primary">{firstName}</Typography> {lastName}
            </Typography>
            <Typography level="h5" component="p">
              {jobTitles.join(" & ")}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            <Button size="lg" component="a" href={cv} target="_blank">
              Download CV
            </Button>
            <Button
              color="neutral"
              variant="outlined"
              size="lg"
              startDecorator={
                <SiLinkedin className={simpleIconsClasses.root} />
              }
              component="a"
              href={linkedin?.url}
              target="_blank"
            >
              {linkedin?.platform?.name}
            </Button>
          </Stack>
        </Stack>
      </Container>
      <SectionDivider
        sx={{ color: "background.body", bgcolor: "background.level1" }}
      />
      <Box
        component="section"
        id={about.id}
        sx={{ bgcolor: "background.level1" }}
      >
        <Container>
          <Stack spacing={6} sx={{ alignItems: "center", textAlign: "center" }}>
            <Typography level="h2">About</Typography>
            {personalPhoto && (
              <Image
                loader={contentfulLoader}
                src={personalPhoto}
                alt={`Picture of ${firstName} ${lastName}`}
                width={200}
                height={200}
                sx={{ borderRadius: "md" }}
              />
            )}
            <Stack spacing={2}>
              <Typography level="h3">
                {"Hello again! "}
                <Typography color="primary">
                  {`I'm ${firstName} ${lastName}`}
                </Typography>
                .
              </Typography>
              <Typography sx={{ maxWidth: "60ch" }}>
                {selfIntroduction}
              </Typography>
            </Stack>
            <Grid
              container
              spacing={6}
              sx={{ justifyContent: "center" }}
              disableEqualOverflow
            >
              {skillCategories.map(({ id, ...skillCategory }) => {
                const Icon = getIconByContentfulId(id);
                return (
                  <Grid key={id} xs={12} sm={6} lg={4}>
                    <SKillCategory icon={Icon && <Icon />} {...skillCategory} />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>
      <SectionDivider
        sx={{ color: "background.level1", bgcolor: "primary.solidBg" }}
      />
      <Sheet
        component="section"
        variant="solid"
        color="primary"
        invertedColors
        sx={{
          "& ::selection": {
            bgcolor: "var(--variant-solidBg)",
            color: "var(--variant-solidColor)",
          },
        }}
      >
        <Container>
          <Stack
            spacing={6}
            sx={{ alignItems: { sm: "center" }, textAlign: "center" }}
          >
            <Stack spacing={2}>
              <Typography level="h2">Fun Fact</Typography>
              <Typography>
                This website is built on top of the following technologies and
                platforms.
              </Typography>
            </Stack>
            <Grid
              container
              spacing={6}
              sx={{
                justifyContent: "center",
                "--Icon-fontSize": (theme) => theme.vars.fontSize.xl7,
              }}
              disableEqualOverflow
            >
              {websiteTechStack.map(({ name, Icon, url }) => (
                <Grid key={name} xs={6} sm={3}>
                  <Stack
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                    component="a"
                    href={url}
                    target="_blank"
                  >
                    <Icon className={simpleIconsClasses.root} />
                    <Typography>{name}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Typography>And more...</Typography>
            <Button
              size="lg"
              endDecorator={<KeyboardArrowRightRounded />}
              component="a"
              href="https://github.com/mwskwong/resume"
              target="_blank"
            >
              See the source code
            </Button>
          </Stack>
        </Container>
      </Sheet>
      <SectionDivider sx={{ color: "primary.solidBg" }} />
      <Box component="section" sx={{ height: 1000 }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography level="h1" sx={{ color: "text.tertiary" }}>
            Experience section
          </Typography>
        </Container>
      </Box>
      <SectionDivider sx={{ bgcolor: "background.level1" }} />
      <Box
        component="section"
        id={education.id}
        sx={{ bgcolor: "background.level1" }}
      >
        <Container>
          <Stack spacing={6}>
            <Typography level="h2" sx={{ textAlign: "center" }}>
              Education
            </Typography>
            <Typography
              level="h1"
              sx={{ textAlign: "center", color: "text.tertiary" }}
            >
              Education timeline
            </Typography>
            <Stack spacing={2}>
              <Input
                size="lg"
                placeholder="Search courses..."
                startDecorator={<SearchRounded />}
                endDecorator={
                  courseSearch.length > 0 && (
                    <IconButton
                      color="neutral"
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
              <Grid container spacing={2}>
                {filteredCourses.map((course) => (
                  <Grid key={course.name} xs={12} md={6}>
                    <CourseCard {...course} sx={{ height: "100%" }} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <SectionDivider sx={{ color: "background.level1" }} />
      <Container component="section" id={contact.id}>
        <Stack spacing={6}>
          <Typography level="h2" sx={{ textAlign: "center" }}>
            Contact
          </Typography>
          <Grid container spacing={6}>
            <Grid
              component="address"
              container
              xs={12}
              md={4}
              spacing={3}
              sx={{ "--Icon-fontSize": (theme) => theme.vars.fontSize.xl4 }}
            >
              {personalInfo.map(({ Icon, title, value, url }) => (
                <Grid key={title} xs={12} sm={4} md={12}>
                  <Stack spacing={1} sx={{ alignItems: "center" }}>
                    <Icon />
                    <Typography>{title}</Typography>
                    <Link
                      href={url}
                      target={url.startsWith("http") ? "_blank" : undefined}
                    >
                      {value}
                    </Link>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default HomeClient;
