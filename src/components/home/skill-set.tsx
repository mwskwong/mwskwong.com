import {
  Avatar,
  Badge,
  Card,
  Flex,
  Heading,
  Section,
  type SectionProps,
} from '@radix-ui/themes';
import {
  type Icon,
  IconActivity,
  IconBrain,
  IconDatabase,
  IconDeviceDesktopCog,
  IconDevices,
  IconLayout,
  IconServer,
  IconSettings,
  IconTestPipe,
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
  [devOps]: IconSettings,
  [frontend]: IconLayout,
  [machineLearning]: IconBrain,
  [mobile]: IconDevices,
  [qa]: IconTestPipe,
  [monitoring]: IconActivity,
  [toolsAndPlatforms]: IconTools,
} as Record<string, Icon>;

export type SkillSetProps = Omit<SectionProps, 'children'>;
export const SkillSet: FC<SkillSetProps> = async ({ className, ...props }) => {
  const skillSet = await getSkillSet();

  return (
    <Section
      className={cn(
        'columns-1 gap-rx-5 sm:columns-2 md:columns-3 [&>*:not(:last-child)]:mb-rx-5',
        className,
      )}
      {...props}
    >
      {skillSet.map(({ id, name, skills }) => {
        const Icon = SkillCategoryIcons[id];

        return (
          <Card key={id}>
            <Flex align="center" gap="3" mb="5">
              {Icon ? <Avatar fallback={<Icon />} size="4" /> : null}
              <Heading as="h3" size="5">
                {name}
              </Heading>
            </Flex>
            <Flex gap="3" wrap="wrap">
              {skills.map(({ name, url }) => (
                <Badge key={name} asChild={Boolean(url)} color="gray" size="2">
                  {url ? (
                    <a href={url} rel="noopener" target="_blank">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </Badge>
              ))}
            </Flex>
            {Icon ? (
              <Icon
                className="absolute -bottom-rx-9 -right-rx-9 -z-[1] -rotate-12 text-accent-2"
                size={200}
              />
            ) : null}
          </Card>
        );
      })}
    </Section>
  );
};
