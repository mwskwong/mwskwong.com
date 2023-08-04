import { Box, BoxProps, Button, Container, Stack, Typography } from "@mui/joy";
import mergeSx from "merge-sx";

import LinkedIn from "@/components/icons/linkedin";
import { firstName, jobTitles, lastName } from "@/constants/content";
import { linkedin } from "@/constants/contentful-ids";
import { home } from "@/constants/nav";
import { getCv, getPlatformProfiles } from "@/lib";

const Hero = async ({ sx, ...props }: BoxProps<"section">) => {
  const [cv, platformProfiles] = await Promise.all([
    getCv(),
    getPlatformProfiles(),
  ]);
  const linkedinProfile = platformProfiles.find(
    ({ platform }) => platform?.id === linkedin,
  );

  return (
    <Box
      component="section"
      id={home.id}
      sx={mergeSx({ pt: { sm: 16 } }, sx)}
      {...props}
    >
      <Container>
        <Stack spacing={5} sx={{ justifyContent: "center" }}>
          <Stack spacing={2} sx={{ textAlign: "center" }}>
            <Typography level="body-sm">HELLO</Typography>
            <Typography level="h1">
              {"I'm "}
              <Typography color="primary">{firstName}</Typography> {lastName}
            </Typography>
            <Typography level="title-lg">{jobTitles.join(" & ")}</Typography>
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
