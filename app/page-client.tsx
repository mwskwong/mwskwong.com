"use client";

import { SiLinkedin } from "@icons-pack/react-simple-icons";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { FC } from "react";

import {
  getCv,
  getPersonalPhoto,
  getPlatformProfiles,
  getSkillCategories,
} from "@/api";
import Image from "@/components/image";
import SectionDivider from "@/components/section-divider";
import SKillCategory from "@/components/skill-category";
import {
  firstName,
  jobTitles,
  lastName,
  selfIntroduction,
  websiteTechStack,
} from "@/constants/data";
import { about, home } from "@/constants/nav";
import { simpleIconsClasses } from "@/theme";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";
import { contentfulLoader } from "@/utils/image-loaders";

interface Props {
  cv?: Awaited<ReturnType<typeof getCv>>;
  platformProfiles?: Awaited<ReturnType<typeof getPlatformProfiles>>;
  personalPhoto?: Awaited<ReturnType<typeof getPersonalPhoto>>;
  skillCategories?: Awaited<ReturnType<typeof getSkillCategories>>;
}

const HomeClient: FC<Props> = ({
  cv,
  platformProfiles = [],
  personalPhoto,
  skillCategories = [],
}) => {
  const linkedin = platformProfiles.find(
    (profile) => profile.platform?.id === "1pixZwU07yhCdpEdkxGVof"
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
      <Sheet component="section" variant="solid" color="primary" invertedColors>
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
            Dummy section
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default HomeClient;
