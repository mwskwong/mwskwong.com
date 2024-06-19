'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Sheet,
  Slider,
  Stack,
  type StackProps,
  Typography,
} from '@mui/joy';
import { type FC, useDeferredValue, useState } from 'react';

import { Icon } from '../contentful';

export interface SkillSetProps extends Omit<StackProps, 'children'> {
  skillSet?: {
    id: string;
    name?: string;
    skills: { name?: string; proficiency?: number; url?: string }[];
  }[];
}

export const SkillSet: FC<SkillSetProps> = ({ skillSet = [], ...props }) => {
  const [proficiency, setProficiency] = useState<[number, number]>([1, 5]);
  const deferredProficiency = useDeferredValue(proficiency);
  const filteredSkillSet = skillSet
    .map(({ skills, ...category }) => ({
      ...category,
      skills: skills.filter(
        ({ proficiency = 0 }) =>
          proficiency >= deferredProficiency[0] &&
          proficiency <= deferredProficiency[1],
      ),
    }))
    .filter(({ skills }) => skills.length > 0);

  return (
    <Stack spacing={2} {...props}>
      <Stack
        sx={{ alignItems: 'center', maxWidth: 300, mx: 'auto', width: '100%' }}
      >
        <Typography level="title-md">Skill Proficiency</Typography>
        <Slider
          getAriaLabel={() => 'Skill proficiency range'}
          max={5}
          min={1}
          value={proficiency}
          valueLabelDisplay="on"
          onChange={(_, proficiency) =>
            setProficiency(proficiency as [number, number])
          }
        />
      </Stack>
      <Box
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: 4,
          '& > *': { breakInside: 'avoid', mb: 4 },
        }}
      >
        {filteredSkillSet.map(({ id, name, skills }) => (
          <Card key={id}>
            <Sheet
              color="primary"
              variant="soft"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'sm',
                width: 40,
                height: 40,
              }}
            >
              <Icon contentfulId={id} />
            </Sheet>
            <CardContent>
              <Typography level="title-md">{name}</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
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
  );
};
