import { SkillCategoryIcons } from "../skill-category-icons";
import { routes } from "@/constants/site-config";
import { getSkillSet } from "@/lib/queries";
import {
  Badge,
  Box,
  Button,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { type FC } from "react";

export type FeaturedSkillsProps = Omit<FlexProps, "asChild" | "children">;
export const FeaturedSkills: FC<FeaturedSkillsProps> = async (properties) => {
  const skillSet = await getSkillSet();
  const featuredSkillSet = skillSet
    .map(({ skills, ...category }) => ({
      ...category,
      skills: skills.filter(({ proficiency }) => proficiency >= 4),
    }))
    .filter(({ skills }) => skills.length > 0);

  return (
    <Flex
      asChild
      align={{ sm: "start" }}
      direction="column"
      gap="8"
      {...properties}
    >
      <Section>
        <Heading as="h2" size="8">
          Featured Skills
        </Heading>
        <Flex direction="column" gap="8">
          {featuredSkillSet.map(({ id, name, skills }) => {
            const Icon = SkillCategoryIcons[id];
            return (
              <Box key={id}>
                <Flex asChild gap="2">
                  <Heading as="h3" size="4">
                    {Icon && (
                      <Text asChild data-accent-color="">
                        <Icon />
                      </Text>
                    )}
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
                        <a href={url} rel="noopener noreferrer" target="_blank">
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
