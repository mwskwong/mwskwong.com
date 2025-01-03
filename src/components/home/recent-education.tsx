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
import { getEducations } from "@/lib/queries";

import * as Timeline from "../timeline";

export type RecentEducationProps = Omit<FlexProps, "asChild" | "children">;
export const RecentEducation: FC<RecentEducationProps> = async (properties) => {
  const educations = await getEducations();
  const recentEducations = educations.slice(0, 2);

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
          Recent Education
        </Heading>
        <Timeline.Root>
          {recentEducations.map(
            ({
              id,
              from,
              to,
              program,
              school,
              supportingDocuments = [],
              ...education
            }) => (
              <Timeline.Item
                key={id}
                columns={{ sm: "4", md: "" }}
                from={new Date(from)}
                gap={{ sm: "4", md: "" }}
                media={supportingDocuments}
                organization={school}
                title={program}
                to={to && new Date(to)}
                {...education}
              />
            ),
          )}
        </Timeline.Root>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.education.pathname}>
            View all Educations <IconArrowRight size={20} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
