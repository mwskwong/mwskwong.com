import '@radix-ui/themes/tokens/colors/gold.css';
import '@radix-ui/themes/tokens/colors/amber.css';
import '@radix-ui/themes/tokens/colors/ruby.css';
import '@radix-ui/themes/tokens/colors/violet.css';
import '@radix-ui/themes/tokens/colors/blue.css';
import '@radix-ui/themes/tokens/colors/cyan.css';
import '@radix-ui/themes/tokens/colors/jade.css';
import '@radix-ui/themes/tokens/colors/lime.css';

import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
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
import { getCourseCategories, getCourses, getEducations } from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

const colors = [
  'gold',
  'amber',
  'ruby',
  'violet',
  'blue',
  'cyan',
  'jade',
  'lime',
  'gray',
] as const;

const EducationPage = async () => {
  const [educations, courseCategories = [], courses] = await Promise.all([
    getEducations(),
    getCourseCategories(),
    getCourses(),
  ]);

  const courseCategoryColors = courseCategories.reduce<
    Record<string, (typeof colors)[number]>
  >(
    (acc, category, index) => ({
      ...acc,
      [category]: colors[index] ?? 'gray',
    }),
    {},
  );

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
              Education
            </Heading>
            <Timeline.Root mt="8">
              {educations.map(
                ({
                  id,
                  from,
                  to,
                  program,
                  school,

                  supportingDocuments,
                }) => (
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
          </Section>
          <Section>
            <Heading as="h2" size="8">
              Self-studies
            </Heading>
            <Grid columns={{ sm: '2', md: '3' }} gap="5" mt="8">
              {courses.map(
                ({
                  id,
                  name,
                  institution,
                  description,
                  completedOn,
                  certificate,
                  categories,
                }) => (
                  <Card key={id} asChild>
                    <a href={certificate} rel="noopener" target="_blank">
                      {institution?.logo ? (
                        <Flex align="center" justify="between">
                          <Image
                            alt={institution.name}
                            className="object-scale-down"
                            height={24}
                            src={institution.logo}
                            width={24}
                          />
                          <Text>{institution.name}</Text>
                        </Flex>
                      ) : null}
                      <Heading as="h3" mt="4" size="4">
                        {name}
                      </Heading>
                      <Text as="p" color="gray" mt="2" size="2">
                        {dateFormatter.format(new Date(completedOn))}
                      </Text>
                      <Text as="p" className="line-clamp-3" mt="4">
                        {description}
                      </Text>
                      {categories ? (
                        <Flex gap="3" mt="4">
                          {categories.map((category) => (
                            <Badge
                              key={category}
                              color={courseCategoryColors[category]}
                              size="3"
                            >
                              {category}
                            </Badge>
                          ))}
                        </Flex>
                      ) : null}
                    </a>
                  </Card>
                ),
              )}
            </Grid>
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
                    name: routes.education.name,
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
  title: routes.education.name,
} satisfies Metadata;

export default EducationPage;
