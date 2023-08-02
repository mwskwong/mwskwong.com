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

import { linkedin } from "@/constants/contentful-ids";
import { firstName, jobTitles, lastName } from "@/constants/data";
import { home } from "@/constants/nav";
import { getCv, getPlatformProfiles } from "@/lib";
import { simpleIconsClasses } from "@/theme/classes";

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
              startDecorator={
                <SiLinkedin className={simpleIconsClasses.root} />
              }
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
