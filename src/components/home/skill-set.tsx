'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Slider,
  Stack,
  type StackProps,
  Typography,
} from '@mui/joy';
import { Info } from 'lucide-react';
import { type FC, useDeferredValue, useState } from 'react';

import { Icon } from '../contentful';

const skillProficiencies = [
  {
    name: 'Beginner',
    value: 1,
    description:
      'Basic understanding of concepts. Can perform simple tasks with guidance. Familiar with fundamental terminology and principles.',
  },
  {
    name: 'Advanced Beginner',
    value: 2,
    description:
      'Can handle straightforward tasks independently. Requires some supervision for more complex work. Beginning to see the bigger picture.',
  },
  {
    name: 'Intermediate',
    value: 3,
    description:
      'Works independently on most tasks. Good understanding of best practices. Can troubleshoot common issues. Contributes to team discussions.',
  },
  {
    name: 'Advanced',
    value: 4,
    description:
      'Deep understanding of the skill area. Can handle complex tasks and projects. Often consulted by others for advice. Keeps up with latest developments.',
  },
  {
    name: 'Expert',
    value: 5,
    description:
      'Comprehensive and authoritative knowledge. Can innovate and optimize. Mentors others effectively. Recognized as a go-to person in this skill area.',
  },
];

export interface SkillSetProps extends Omit<StackProps, 'children'> {
  skillSet?: {
    id: string;
    name?: string;
    skills: { name?: string; proficiency?: number; url?: string }[];
  }[];
}

export const SkillSet: FC<SkillSetProps> = ({ skillSet = [], ...props }) => {
  const [proficiency, setProficiency] = useState([
    skillProficiencies[0]?.value ?? 1,
    skillProficiencies.at(-1)?.value ?? 5,
  ] as const);
  const [modalOpen, setModalOpen] = useState(false);
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
    <>
      <Stack spacing={2} {...props}>
        <Stack
          sx={{
            alignItems: 'center',
            maxWidth: 300,
            mx: 'auto',
            width: '100%',
          }}
        >
          <Typography
            level="title-md"
            endDecorator={
              <IconButton
                aria-label="skill proficiency details"
                sx={{ '--IconButton-size': '24px', ml: -0.5 }}
                onClick={() => setModalOpen(true)}
              >
                <Info />
              </IconButton>
            }
          >
            Skill Proficiency
          </Typography>
          <Slider
            getAriaLabel={() => 'Skill proficiency range'}
            max={skillProficiencies.at(-1)?.value}
            min={skillProficiencies[0]?.value}
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <DialogTitle>Skill Proficiencies</DialogTitle>
          <ModalClose />
          <DialogContent
            sx={{
              marginInline: 'calc(-1 * var(--Card-padding))',
              paddingInline: 'var(--Card-padding)',
            }}
          >
            {skillProficiencies.map(({ name, value, description }) => (
              <Typography key={value} sx={{ color: 'inherit' }}>
                <Typography sx={{ fontWeight: 'md' }}>
                  {value} - {name}:{' '}
                </Typography>
                {description}
              </Typography>
            ))}
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};
