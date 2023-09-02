import Box, { BoxProps } from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

import { firstName, lastName, selfIntroduction } from "@/constants/content";
import { about } from "@/constants/nav";
import getPersonalPhoto from "@/lib/get-personal-photo";
import getSkillCategories from "@/lib/get-skill-categories";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

import Image from "../image";

const About: FC<Omit<BoxProps<"section">, "children">> = async (props) => {
  const [personalPhoto, skillCategories] = await Promise.all([
    getPersonalPhoto(),
    getSkillCategories(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={6} alignItems="center" textAlign="center">
          <Typography level="h2" id={about.id}>
            About
          </Typography>
          {personalPhoto && (
            <Image
              src={personalPhoto}
              alt={`Picture of ${firstName} ${lastName}`}
              width={200}
              height={200}
              priority
              sx={{
                borderRadius: "md",
                border: 1,
                borderColor: "neutral.outlinedBorder",
              }}
            />
          )}
          <Box>
            <Typography level="title-lg">
              {"Hello again! "}
              <Typography color="primary">
                {`I'm ${firstName} ${lastName}`}
              </Typography>
              .
            </Typography>
            <Typography maxWidth="sm">{selfIntroduction}</Typography>
          </Box>
          <Grid
            container
            spacing={6}
            justifyContent="center"
            disableEqualOverflow
          >
            {skillCategories.map(({ id, name, skills }) => {
              const Icon = getIconByContentfulId(id);
              return (
                <Grid key={id} xs={12} sm={6} lg={4}>
                  <Stack spacing={2} alignItems="center">
                    <Sheet
                      variant="outlined"
                      sx={{ display: "flex", borderRadius: "sm", p: 1.5 }}
                    >
                      {Icon && <Icon fontSize="xl4" />}
                    </Sheet>
                    <Typography level="title-md" color="primary">
                      {name}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      flexWrap="wrap"
                    >
                      {skills.map((skill) => (
                        <Chip key={skill} variant="outlined">
                          {skill}
                        </Chip>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
