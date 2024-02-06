import {
  Box,
  BoxProps,
  Card,
  Chip,
  Container,
  Grid,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { chunk } from 'lodash-es';
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
        <Stack alignItems="center" spacing={8}>
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
          <Grid container spacing={4}>
            {chunk(skillCategories, 3).map((column, index) => (
              // eslint-disable-next-line react/no-array-index-key -- we are not gonna sort the columns in runtime
              <Grid key={index} lg={4} sm={6} xs={12}>
                <Stack spacing={4}>
                  {column.map(({ id, name, skills }) => (
                    <Card key={id}>
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
                      <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {skills.map((skill) => (
                          <Chip key={skill}>{skill}</Chip>
                        ))}
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
