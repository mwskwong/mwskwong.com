import Box, { BoxProps } from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

import LinkedIn from "@/components/icons/linkedin";
import { firstName, headline, lastName } from "@/constants/content";
import { linkedin } from "@/constants/contentful-ids";
import { home } from "@/constants/nav";
import getCv from "@/lib/get-cv";
import getPlatformProfiles from "@/lib/get-platform-profiles";

const Hero: FC<Omit<BoxProps<"section">, "children">> = async (props) => {
  const [cv, linkedinProfile] = await Promise.all([
    getCv(),
    getPlatformProfiles().then((platformProfiles) =>
      platformProfiles.find(({ platform }) => platform?.id === linkedin),
    ),
  ]);

  return (
    <Box component="section" id={home.id} pt={{ sm: 16 }} {...props}>
      <Container>
        <Stack spacing={5} justifyContent="center">
          <Stack spacing={2} textAlign="center">
            <Typography level="body-sm">HELLO</Typography>
            <Typography level="h1">
              {"I'm "}
              <Typography color="primary">{firstName}</Typography> {lastName}
            </Typography>
            <Typography level="title-lg">{headline}</Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button size="lg" component="a" href={cv} target="_blank">
              Download CV
            </Button>
            <Button
              color="neutral"
              variant="outlined"
              size="lg"
              startDecorator={<LinkedIn />}
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
};

export default Hero;
