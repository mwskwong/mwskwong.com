import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Section,
} from '@radix-ui/themes';
import { IconArrowLeft } from '@tabler/icons-react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { type BreadcrumbList, type Graph } from 'schema-dts';

import { Footer } from '@/components/footer';
import { SkillCategoryIcons } from '@/components/skill-category-icons';
import { firstName, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import { getSkillSet } from '@/lib/queries';

const SkillsPage = async () => {
  const skillSet = await getSkillSet();

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
              Skills
            </Heading>
            <Box
              className="sm:column gap-rx-5 md:columns-3 [&>*:not(:first-child)]:mt-rx-5"
              mt="8"
            >
              {skillSet.map(({ id, name, skills }) => {
                const Icon = SkillCategoryIcons[id];
                return (
                  <Card key={id}>
                    <Flex asChild align="center" gap="3">
                      <Heading as="h2" size="4">
                        {Icon ? <Avatar fallback={<Icon />} size="4" /> : null}
                        {name}
                      </Heading>
                    </Flex>
                    <Flex gap="3" mt="5" wrap="wrap">
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
                    {Icon ? (
                      <Icon
                        className="absolute -bottom-rx-8 -right-rx-8 -z-[1] -rotate-12 text-accent-2"
                        size={200}
                      />
                    ) : null}
                  </Card>
                );
              })}
            </Box>
          </Section>
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
                    name: routes.skills.name,
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
  title: routes.skills.name,
} satisfies Metadata;

export default SkillsPage;
