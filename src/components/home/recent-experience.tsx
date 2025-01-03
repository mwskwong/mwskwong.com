import {
  Button,
  Flex,
  type FlexProps,
  Heading,
  Section,
} from "@radix-ui/themes";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { type FC } from "react";

import { routes } from "@/constants/site-config";
import { getExperiences } from "@/lib/queries";

import * as Timeline from "../timeline";

export type RecentExperienceProps = Omit<FlexProps, "asChild" | "children">;
export const RecentExperience: FC<RecentExperienceProps> = async (
  properties,
) => {
  const experiences = await getExperiences();
  const recentExperiences = experiences.slice(0, 2);

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
          Recent Experience
        </Heading>
        <Timeline.Root>
          {recentExperiences.map(
            ({
              id,
              from,
              to,
              jobTitle,
              company,
              jobDuties,
              skills,
              projects = [],
              supportingDocuments = [],
              ...experience
            }) => (
              <Timeline.Item
                key={id}
                columns={{ sm: "4", md: "" }}
                descriptions={jobDuties}
                from={new Date(from)}
                gap={{ sm: "4", md: "" }}
                media={[...projects, ...supportingDocuments]}
                organization={company}
                tags={skills}
                title={jobTitle}
                to={to && new Date(to)}
                {...experience}
              />
            ),
          )}
        </Timeline.Root>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.experience.pathname}>
            View all Experiences <IconArrowRight size={20} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
