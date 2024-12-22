import { Button, Flex, Heading, Section } from '@radix-ui/themes';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getEducations } from '@/lib/queries';

import * as Timeline from '../timeline';

export const RecentEducation: FC = async () => {
  const recentEducations = (await getEducations()).slice(0, 2);

  return (
    <Flex asChild align={{ sm: 'center' }} direction="column" gap="8">
      <Section>
        <Heading as="h2" size="8">
          Recent Education
        </Heading>
        <Timeline.Root>
          {recentEducations.map(
            ({ id, from, to, program, school, supportingDocuments = [] }) => (
              <Timeline.Item
                key={id}
                from={new Date(from)}
                media={supportingDocuments}
                organization={school}
                title={program}
                to={to ? new Date(to) : undefined}
              />
            ),
          )}
        </Timeline.Root>
        <Button asChild highContrast size="3" variant="soft">
          <Link href={routes.education.pathname}>
            View all Educations <IconChevronRight size={16} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
