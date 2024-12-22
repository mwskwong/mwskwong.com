import { Flex, Heading, Link, Section } from '@radix-ui/themes';
import { IconArrowRight } from '@tabler/icons-react';
import NextLink from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getEducations } from '@/lib/queries';

import * as Timeline from '../timeline';

export const RecentEducation: FC = async () => {
  const recentEducations = (await getEducations()).slice(0, 2);

  return (
    <Flex asChild align="start" direction="column" gap="8">
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
        <Flex asChild align="center" gap="3">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- wrapping next/link */}
          <Link asChild>
            <NextLink href={routes.education.pathname}>
              View all Educations <IconArrowRight size={20} />
            </NextLink>
          </Link>
        </Flex>
      </Section>
    </Flex>
  );
};
