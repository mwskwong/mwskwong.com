import Box, { BoxProps } from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { firstName, lastName, selfIntroduction } from '@/constants/content';
import { about } from '@/constants/nav';
import { getPersonalPhoto, getSkillCategories } from '@/lib/queries';

import { ContentfulIcon } from '../contentful-icon';
import { Image } from '../image';

export type AboutProps = Omit<BoxProps<'section'>, 'children'>;
export const About: FC<AboutProps> = async (props) => {
  const [personalPhoto, skillCategories] = await Promise.all([
    getPersonalPhoto(),
    getSkillCategories(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack alignItems="center" spacing={8} textAlign="center">
          <Typography id={about.id} level="h2">
            About
          </Typography>
          <Stack alignItems="center" spacing={4}>
            {personalPhoto ? (
              <Image
                alt={`${firstName} ${lastName}`}
                height={200}
                priority
                src={personalPhoto}
                sx={{
                  borderRadius: 'md',
                  border: 1,
                  borderColor: 'neutral.outlinedBorder',
                }}
                width={200}
              />
            ) : null}
            <Typography maxWidth="sm">{selfIntroduction}</Typography>
          </Stack>
          <Grid
            container
            disableEqualOverflow
            justifyContent="center"
            spacing={6}
          >
            {skillCategories.map(({ id, name, skills }) => (
              <Grid key={id} lg={4} sm={6} xs={12}>
                <Stack alignItems="center" spacing={2}>
                  <Sheet
                    color="primary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'sm',
                      width: 48,
                      height: 48,
                    }}
                    variant="outlined"
                  >
                    <ContentfulIcon contentfulId={id} />
                  </Sheet>
                  <Typography level="title-md">{name}</Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    spacing={1}
                  >
                    {skills.map((skill) => (
                      <Chip key={skill}>{skill}</Chip>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
