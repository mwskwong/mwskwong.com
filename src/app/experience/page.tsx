import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import { IconArrowLeft } from '@tabler/icons-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { type BreadcrumbList, type Graph } from 'schema-dts';

import { Footer } from '@/components/footer';
import * as Timeline from '@/components/timeline';
import { firstName, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import { getContributedProjects, getExperiences } from '@/lib/queries';

const ExperiencePage = async () => {
  const [experiences, contributedProjects] = await Promise.all([
    getExperiences(),
    getContributedProjects(),
  ]);

  return (
    <>
      <Container>
        <main>
          <Section>
            <Button asChild highContrast size="3" variant="ghost">
              <Link href={routes.home.pathname}>
                <IconArrowLeft size={20} />
                {firstName} {lastName}
              </Link>
            </Button>
            <Heading mt="2" size="9">
              Experience
            </Heading>
            <Timeline.Root mt="8">
              {experiences.map(
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
          </Section>
          <Flex asChild align="center" direction="column">
            <Section>
              <Heading align="center" as="h2" size="8">
                Open-source Contribution
              </Heading>
              <Text align="center" as="p" className="max-w-[60ch]" mt="4">
                Periodically, I engage in open-source contributions. Below are
                the projects I&apos;ve contributed to thus far.
              </Text>
              <Flex gap="4" justify="center" my="6" wrap="wrap">
                {contributedProjects.map(
                  ({ id, name, logo, url }) =>
                    logo && (
                      <Tooltip key={id} content={name}>
                        <a href={url} rel="noopener" target="_blank">
                          <Image
                            alt={name}
                            className="object-scale-down"
                            height={36}
                            src={logo}
                            width={36}
                          />
                        </a>
                      </Tooltip>
                    ),
                )}
              </Flex>
              <Text>And more to come...</Text>
            </Section>
          </Flex>
        </main>
        <Footer />
      </Container>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: routes.home.name,
                    item: siteUrl,
                    position: 1,
                  },
                  {
                    '@type': 'ListItem',
                    name: routes.experience.name,
                    position: 2,
                  },
                ],
                name: 'Breadcrumbs',
              } satisfies BreadcrumbList,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export const metadata = {
  title: routes.experience.name,
} satisfies Metadata;

export default ExperiencePage;
