import {
  Box,
  BoxProps,
  Chip,
  Container,
  Grid,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { FC } from 'react';

import { firstName, lastName, selfIntroduction } from '@/constants/content';
import { about } from '@/constants/nav';
import { getPersonalPhoto, getSkillCategories } from '@/lib/queries';

import { Icon } from '../contentful';
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
                  borderRadius: '50%',
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
                    <Icon contentfulId={id} />
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
