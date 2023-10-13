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
import { getPersonalPhoto } from '@/lib/get-personal-photo';
import { getSkillCategories } from '@/lib/get-skill-categories';
import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

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
          <Stack spacing={2}>
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
            {skillCategories.map(({ id, name, skills }) => {
              const Icon = getIconByContentfulId(id);
              return (
                <Grid key={id} lg={4} sm={6} xs={12}>
                  <Stack alignItems="center" spacing={2}>
                    <Sheet
                      color="primary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 'sm',
                        fontSize: 'xl5',
                        width: '1em',
                        height: '1em',
                      }}
                      variant="outlined"
                    >
                      {Icon ? <Icon /> : null}
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
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
