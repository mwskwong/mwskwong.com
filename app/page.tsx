"use client";

import { Container, Typography } from "@mui/joy";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Container sx={{ minHeight: 2000 }}>
      <Typography level="display1">Display 1</Typography>
      <Typography level="h1">Heading 1</Typography>
      <Typography component="code">This is a code block</Typography>
    </Container>
  );
};

export default Home;
