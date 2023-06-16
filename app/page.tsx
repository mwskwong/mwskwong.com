"use client";

import { SiLinkedin } from "@icons-pack/react-simple-icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import { FC } from "react";

import SectionDivider from "@/components/section-divider";
import SKillCategory from "@/components/skill-category";
import { about, home } from "@/constants/nav";
import { simpleIconsClasses } from "@/theme";

const Home: FC = () => {
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
              I&apos;m <Typography color="primary">Matthew</Typography> Kwong
            </Typography>
            <Typography level="h5" component="p">
              Frontend Dev & System DBA
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            <Button size="lg">Download Resume</Button>
            <Button
              color="neutral"
              variant="outlined"
              size="lg"
              startDecorator={
                <SiLinkedin className={simpleIconsClasses.root} />
              }
              component="a"
              href="https://www.linkedin.com/in/mwskwong/"
              target="_blank"
            >
              LinkedIn
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
            <Box
              sx={{
                width: 200,
                aspectRatio: 1,
                borderRadius: "md",
                bgcolor: "background.level2",
              }}
            />
            <Stack spacing={2}>
              <Typography level="h3">
                {"Hello again! "}
                <Typography color="primary">I&apos;m Matthew Kwong</Typography>.
              </Typography>
              <Typography sx={{ maxWidth: "60ch" }}>
                Dynamic and experienced Frontend Developer and System DBA.
                Skilled in frontend development, database management, analytical
                thinking, and creative problem-solving. Adaptable team player
                with the ability to work independently and an eagerness to
                succeed.
              </Typography>
            </Stack>
            <Grid container spacing={6} disableEqualOverflow>
              {Array.from({ length: 8 }, (_, index) => (
                <Grid key={index} xs={12} sm={6} lg={4}>
                  <SKillCategory
                    category="Frontend"
                    skills={[
                      "MUI",
                      "Next.js",
                      "React",
                      "React Hook Form",
                      "TypeScript",
                      "Zustand",
                      "React Query",
                      "React Router",
                      "Vue",
                      "Vuetify",
                      "Vuex",
                      "Pinia",
                      "Quasar",
                    ]}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
      <SectionDivider sx={{ color: "background.level1" }} />
      <Box component="section" sx={{ height: 1000 }}>
        <Container sx={{ textAlign: "center" }}></Container>
      </Box>
    </>
  );
};

export default Home;
