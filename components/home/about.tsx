import { Box, BoxProps, Container, Stack, Typography } from '@mui/joy';
import { FC } from 'react';

import { firstName, lastName, selfIntroduction } from '@/constants/content';
import { about } from '@/constants/nav';
import { getPersonalPhoto, getSkillSet } from '@/lib/queries';

import { Image } from '../image';

import { SkillSet } from './skill-set';

export type AboutProps = Omit<BoxProps<'section'>, 'children'>;
export const About: FC<AboutProps> = async (props) => {
  const [personalPhoto, skillSet] = await Promise.all([
    getPersonalPhoto(),
    getSkillSet(),
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
            <Typography maxWidth="sm" textAlign="center">
              {selfIntroduction}
            </Typography>
          </Stack>
          <SkillSet skillSet={skillSet} />
        </Stack>
      </Container>
    </Box>
  );
};
