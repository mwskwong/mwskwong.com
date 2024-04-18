import { Box, type BoxProps, Container, Stack, Typography } from '@mui/joy';
import { type FC } from 'react';

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
        <Stack spacing={8} sx={{ alignItems: 'center' }}>
          <Typography id={about.id} level="h2">
            About
          </Typography>
          <Stack spacing={4} sx={{ alignItems: 'center' }}>
            {personalPhoto ? (
              <Image
                priority
                alt={`${firstName} ${lastName}`}
                height={200}
                src={personalPhoto}
                width={200}
                sx={{
                  borderRadius: '50%',
                  border: 1,
                  borderColor: 'neutral.outlinedBorder',
                }}
              />
            ) : null}
            <Typography sx={{ maxWidth: 'sm', textAlign: 'center' }}>
              {selfIntroduction}
            </Typography>
          </Stack>
          <SkillSet skillSet={skillSet} />
        </Stack>
      </Container>
    </Box>
  );
};
