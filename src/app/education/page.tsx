import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/blue.css";
import "@radix-ui/themes/tokens/colors/cyan.css";
import "@radix-ui/themes/tokens/colors/gold.css";
import "@radix-ui/themes/tokens/colors/jade.css";
import "@radix-ui/themes/tokens/colors/lime.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/violet.css";

import { Badge, type BadgeProps } from "@radix-ui/themes/components/badge";
import { Card } from "@radix-ui/themes/components/card";
import { Container } from "@radix-ui/themes/components/container";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";
import Image from "next/image";
import { type BreadcrumbList, type Graph } from "schema-dts";

import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import * as Timeline from "@/components/timeline";
import { routes, siteUrl } from "@/constants/site-config";
import { getCourseCategories, getCourses, getEducations } from "@/lib/queries";
import { dateFormatter } from "@/lib/utils";

import styles from "./page.module.css";

const colors = [
  "gold",
  "amber",
  "ruby",
  "violet",
  "blue",
  "cyan",
  "jade",
  "lime",
  "gray",
] as const satisfies BadgeProps["color"][];

const EducationPage = async () => {
  const [educations, courseCategories = [], courses] = await Promise.all([
    getEducations(),
    getCourseCategories(),
    getCourses(),
  ]);

  const courseCategoryColors = Object.fromEntries(
    courseCategories.map((category, index) => [
      category,
      colors[index] ?? "gray",
    ]),
  );

  return (
    <>
      <Container>
        <main>
          <Section>
            <Breadcrumb routes={[routes.home]} />
            <Heading mt="2" size="8">
              Education
            </Heading>
            <Timeline.Root mt="8">
              {educations.map(
                ({
                  id,
                  program,
                  school,
                  supportingDocuments,
                  ...education
                }) => (
                  <Timeline.Item
                    key={id}
                    media={supportingDocuments}
                    organization={school}
                    title={program}
                    titleAs="h2"
                    {...education}
                  />
                ),
              )}
            </Timeline.Root>
          </Section>
          <Section>
            <Heading as="h2" size="8">
              Self-studies
            </Heading>
            <Grid columns={{ sm: "2", md: "3" }} gap="5" mt="8">
              {courses.map(
                ({
                  id,
                  name,
                  institution,
                  completedOn,
                  certificate,
                  categories,
                }) => {
                  const content = (
                    <Flex direction="column" height="100%">
                      {institution?.logo && (
                        <Flex align="center" justify="between">
                          <Image
                            alt={institution.name}
                            className={styles.institutionLogo}
                            height={24}
                            src={institution.logo}
                            width={24}
                          />
                          <Badge color="gray">{institution.name}</Badge>
                        </Flex>
                      )}
                      <Heading as="h3" mt="4" size="4">
                        {name}
                      </Heading>
                      <Text as="p" color="gray" mt="2" size="2">
                        Completed on {dateFormatter.format(completedOn)}
                      </Text>
                      {categories && (
                        <Flex gap="3" mt="auto" pt="4">
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
                      )}
                    </Flex>
                  );

                  return (
                    <Card key={id} asChild={Boolean(certificate)}>
                      {certificate ? (
                        <a href={certificate} rel="noreferrer" target="_blank">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Card>
                  );
                },
              )}
            </Grid>
          </Section>
        </main>
        <Footer />
      </Container>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    name: routes.home.name,
                    item: siteUrl,
                    position: 1,
                  },
                  {
                    "@type": "ListItem",
                    name: routes.education.name,
                    position: 2,
                  },
                ],
                name: "Breadcrumbs",
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
