import { Avatar, Card, Flex, Heading, Section, Text } from '@radix-ui/themes';
import {
  type Icon,
  IconActivity,
  IconAi,
  IconBugOff,
  IconDatabase,
  IconDeviceDesktopCog,
  IconDevices,
  IconInfinity,
  IconLayout,
  IconServer,
  IconTools,
} from '@tabler/icons-react';
import { type FC } from 'react';

import {
  backend,
  cms,
  database,
  devOps,
  frontend,
  machineLearning,
  mobile,
  monitoring,
  qa,
  toolsAndPlatforms,
} from '@/constants/contentful-ids';
import { getSkillSet } from '@/lib/queries';
import { cn } from '@/lib/utils';

const SkillCategoryIcons = {
  [backend]: IconServer,
  [cms]: IconDeviceDesktopCog,
  [database]: IconDatabase,
  [devOps]: IconInfinity,
  [frontend]: IconLayout,
  [machineLearning]: IconAi,
  [mobile]: IconDevices,
  [qa]: IconBugOff,
  [monitoring]: IconActivity,
  [toolsAndPlatforms]: IconTools,
} as Record<string, Icon>;

export const SkillSet: FC = async () => {
  const skillSet = await getSkillSet();

  return (
    <Section
      className={cn(
        'columns-1 gap-rx-5 sm:columns-2 md:columns-3 [&>*]:mb-rx-5 [&>*]:break-inside-avoid',
      )}
    >
      {skillSet.map(({ id, name, skills }) => {
        const Icon = SkillCategoryIcons[id];

        return (
          <Card key={id}>
            {Icon ? <Avatar fallback={<Icon />} mb="8" size="4" /> : null}
            <Flex direction="column" gap="2">
              <Heading as="h3" size="5">
                {name}
              </Heading>
              <Text>{skills.map(({ name }) => `${name}, `)}</Text>
            </Flex>
          </Card>
        );
      })}
    </Section>
  );
};
