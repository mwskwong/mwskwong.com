import { SiMui } from '@icons-pack/react-simple-icons';
import { Card, Container, Grid, Link, Stack, Typography } from '@mui/joy';
import { FC } from 'react';

import { getSkillCategories } from '@/lib/queries';

const SkillSet: FC = async () => {
  const skillCategories = await getSkillCategories();
  return (
    <Container>
      <Stack spacing={6}>
        {skillCategories.map(({ id, name, skills }) => (
          <Stack key={id} spacing={2}>
            <Typography level="title-md" textAlign="center">
              {name}
            </Typography>
            <Grid container spacing={2}>
              {skills.map((skill) => (
                <Grid key={skill} lg={3} md={4} sm={6} xs={12}>
                  <Card orientation="horizontal">
                    <SiMui color="default" viewBox="-2 -2 28 28" />
                    <Link
                      color="neutral"
                      href="https://mui.com"
                      overlay
                      target="_blank"
                      typography="body-md"
                    >
                      {skill}
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default SkillSet;
