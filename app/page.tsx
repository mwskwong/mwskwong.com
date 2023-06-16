"use client";

import { SiLinkedin } from "@icons-pack/react-simple-icons";
import { Button, Container, Divider, Stack, Typography } from "@mui/joy";
import { FC } from "react";

import { home } from "@/constants/nav";
import { simpleIconsClasses } from "@/theme";

const Home: FC = () => {
  return (
    <>
      <Container component="section" id={home.id} sx={{ pt: { sm: 16 } }}>
        <Stack sx={{ justifyContent: "center" }}>
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
              {"I'm"} <Typography color="primary">Matthew</Typography> Kwong
            </Typography>
            <Typography level="h5" component="p">
              Frontend Dev & System DBA
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 5, justifyContent: "center" }}
          >
            <Button size="lg">Download Resume</Button>
            <Button
              color="neutral"
              variant="soft"
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
    </>
  );
};

export default Home;
