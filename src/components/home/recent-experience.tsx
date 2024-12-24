import { Button, Flex, Heading, Section } from '@radix-ui/themes';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getExperiences } from '@/lib/queries';

import * as Timeline from '../timeline';

export const RecentExperience: FC = async () => {
  const recentExperiences = (await getExperiences()).slice(0, 2);

  return (
    <Flex asChild align={{ sm: 'start' }} direction="column" gap="8">
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
            }) => (
              <Timeline.Item
                key={id}
                descriptions={jobDuties}
                from={new Date(from)}
                media={[...projects, ...supportingDocuments]}
                organization={company}
                tags={skills}
                title={jobTitle}
                to={to ? new Date(to) : undefined}
              />
            ),
          )}
        </Timeline.Root>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.experience.pathname}>
            View all Experiences <IconChevronRight size={16} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
