import {
  Badge,
  Box,
  Button,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import {
  type Icon,
  IconActivity,
  IconArrowRight,
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
import Link from 'next/link';
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
import { routes } from '@/constants/site-config';
import { getSkillSet } from '@/lib/queries';

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

export type FeaturedSkillsProps = Omit<FlexProps, 'asChild' | 'children'>;
export const FeaturedSkills: FC<FeaturedSkillsProps> = async (props) => {
  const skillSet = (await getSkillSet())
    .map(({ skills, ...category }) => ({
      ...category,
      skills: skills.filter(({ proficiency }) => proficiency >= 4),
    }))
    .filter(({ skills }) => skills.length > 0);

  return (
    <Flex asChild align={{ sm: 'start' }} direction="column" gap="8" {...props}>
      <Section>
        <Heading as="h2" size="8">
          Featured Skills
        </Heading>
        <Flex direction="column" gap="8">
          {skillSet.map(({ id, name, skills }) => {
            const Icon = SkillCategoryIcons[id];
            return (
              <Box key={id}>
                <Flex asChild gap="2">
                  <Heading as="h3" size="4">
                    {Icon ? (
                      <Text asChild data-accent-color="">
                        <Icon />
                      </Text>
                    ) : null}
                    {name}
                  </Heading>
                </Flex>
                <Flex gap="3" mt="4" wrap="wrap">
                  {skills.map(({ id, name, url }) => (
                    <Badge
                      key={id}
                      asChild={Boolean(url)}
                      color="gray"
                      size="3"
                    >
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
              </Box>
            );
          })}
        </Flex>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.skills.pathname}>
            View all Skills <IconArrowRight size={20} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
