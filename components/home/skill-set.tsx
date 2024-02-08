'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Sheet,
  Slider,
  Stack,
  StackProps,
  Typography,
} from '@mui/joy';
import { FC, useDeferredValue, useMemo, useState } from 'react';

import { Icon } from '../contentful';

export interface SkillSetProps extends Omit<StackProps, 'children'> {
  skillCategories?: {
    id: string;
    name?: string;
    skills: { name?: string; proficiency?: number; url?: string }[];
  }[];
}

export const SkillSet: FC<SkillSetProps> = ({
  skillCategories = [],
  ...props
}) => {
  const [proficiency, setProficiency] = useState<[number, number]>([1, 5]);
  const deferredProficiency = useDeferredValue(proficiency);
  const filteredSkillCategories = useMemo(
    () =>
      skillCategories
        .map(({ skills, ...category }) => ({
          ...category,
          skills: skills.filter(
            ({ proficiency = 0 }) =>
              proficiency >= deferredProficiency[0] &&
              proficiency <= deferredProficiency[1],
          ),
        }))
        .filter(({ skills }) => skills.length > 0),
    [deferredProficiency, skillCategories],
  );

  return (
    <Stack spacing={2} {...props}>
      <Stack alignItems="center" maxWidth={300} mx="auto" width="100%">
        <Typography level="title-md">Skill Proficiency</Typography>
        <Slider
          getAriaLabel={() => 'Skill proficiency range'}
          max={5}
          min={1}
          onChange={(_, proficiency) =>
            setProficiency(proficiency as [number, number])
          }
          value={proficiency}
          valueLabelDisplay="on"
        />
      </Stack>
      <Box
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: 4,
          '& > *': { breakInside: 'avoid', mb: 4 },
        }}
      >
        {filteredSkillCategories.map(({ id, name, skills }) => (
          <Card key={id}>
            <Sheet
              color="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'sm',
                width: 40,
                height: 40,
              }}
              variant="soft"
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
  );
};
