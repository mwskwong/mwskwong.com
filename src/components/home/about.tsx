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
        <Stack alignItems="center" spacing={6} textAlign="center">
          <Typography id={about.id} level="h2">
            About
          </Typography>
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
          <Box>
            <Typography level="title-lg">
              {'Hello again! '}
              <Typography color="primary">
                {`I'm ${firstName} ${lastName}`}
              </Typography>
              .
            </Typography>
            <Typography maxWidth="sm">{selfIntroduction}</Typography>
          </Box>
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
                      sx={{ display: 'flex', borderRadius: 'sm', p: 1.5 }}
                      variant="outlined"
                    >
                      {Icon ? <Icon fontSize="xl4" /> : null}
                    </Sheet>
                    <Typography color="primary" level="title-md">
                      {name}
                    </Typography>
                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      justifyContent="center"
                      spacing={1}
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
