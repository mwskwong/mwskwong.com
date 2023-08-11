"use client";

import { SiLinkedin } from "@icons-pack/react-simple-icons";
import {
  Box,
  BoxProps,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import mergeSx from "merge-sx";
import { FC } from "react";

import { firstName, jobTitles, lastName } from "@/constants/data";
import { home } from "@/constants/nav";
import { simpleIconsClasses } from "@/theme";

interface Props extends BoxProps<"section"> {
  cv?: string;
  linkedinProfile?: {
    platform?: {
      id: string;
      name: string;
    };
    url: string;
  };
}

const HeroClient: FC<Props> = ({ cv, linkedinProfile, sx, ...props }) => (
  <Box
    component="section"
    id={home.id}
    sx={mergeSx({ pt: { sm: 16 } }, sx)}
    {...props}
  >
    <Container>
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
            startDecorator={<SiLinkedin className={simpleIconsClasses.root} />}
            component="a"
            href={linkedinProfile?.url}
            target="_blank"
          >
            {linkedinProfile?.platform?.name}
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default HeroClient;
