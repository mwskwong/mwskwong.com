import { Flex, Heading, Link, Section } from '@radix-ui/themes';
import { IconArrowRight } from '@tabler/icons-react';
import NextLink from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getExperiences } from '@/lib/queries';

import * as Timeline from '../timeline';

export const RecentExperience: FC = async () => {
  const recentExperiences = (await getExperiences()).slice(0, 2);

  return (
    <Flex asChild align="start" direction="column" gap="8">
      <Section>
        <Heading as="h2" size="8">
          Recent Experience
        </Heading>
        <Timeline.Root>
          {recentExperiences.map(
            ({ id, from, to, jobTitle, company, jobDuties, skills }) => (
              <Timeline.Item
                key={id}
                descriptions={jobDuties}
                from={new Date(from)}
                organization={company}
                tags={skills}
                title={jobTitle}
                to={to ? new Date(to) : undefined}
              />
            ),
          )}
        </Timeline.Root>
        <Flex asChild align="center" gap="3">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- wrapping next/link */}
          <Link asChild>
            <NextLink href={routes.experience.pathname}>
              View all Experiences <IconArrowRight size={20} />
            </NextLink>
          </Link>
        </Flex>
      </Section>
    </Flex>
  );
};
