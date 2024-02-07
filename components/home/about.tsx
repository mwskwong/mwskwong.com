import {
  Box,
  BoxProps,
  Card,
  CardContent,
  Chip,
  Container,
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
          <Box
            sx={{
              columnCount: { xs: 1, sm: 2, md: 3 },
              columnGap: 4,
              '& > *': { breakInside: 'avoid', mb: 4 },
            }}
          >
            {skillCategories.map(({ id, name, skills }) => (
              <Card key={id}>
                <Sheet
                  color="primary"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'sm',
                    boxShadow: 'sm',
                    width: 40,
                    height: 40,
                  }}
                  variant="outlined"
                >
                  <Icon contentfulId={id} />
                </Sheet>
                <CardContent>
                  <Typography level="title-md">{name}</Typography>
                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {skills.map(({ name, url }) => (
                      <Chip
                        key={name}
                        slotProps={{
                          action: url
                            ? { component: 'a', href: url, target: '_blank' }
                            : undefined,
                        }}
                      >
                        {name}
                      </Chip>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
