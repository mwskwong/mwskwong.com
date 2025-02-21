import { Box } from "@radix-ui/themes/components/box";
import { Container } from "@radix-ui/themes/components/container";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { type Metadata } from "next";
import Image from "next/image";
import { type BreadcrumbList, type Graph } from "schema-dts";

import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import * as Timeline from "@/components/timeline";
import { routes, siteUrl } from "@/constants/site-config";
import { getContributedProjects, getExperiences } from "@/lib/queries";

import styles from "./page.module.css";

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
            <Breadcrumb routes={[routes.home]} />
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
                  ...experience
                }) => (
                  <Timeline.Item
                    key={id}
                    descriptions={jobDuties}
                    from={new Date(from)}
                    media={[...projects, ...supportingDocuments]}
                    organization={company}
                    tags={skills}
                    title={jobTitle}
                    titleAs="h2"
                    to={to ? new Date(to) : undefined}
                    {...experience}
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
              <Box asChild maxWidth="60ch">
                <Text align="center" as="p" mt="4">
                  Periodically, I engage in open-source contributions. Below are
                  the projects I&apos;ve contributed to thus far.
                </Text>
              </Box>
              <Flex gap="4" justify="center" my="6" wrap="wrap">
                {contributedProjects.map(
                  ({ id, name, logo, url }) =>
                    logo && (
                      <Tooltip key={id} content={name}>
                        <a href={url} rel="noreferrer" target="_blank">
                          <Image
                            alt={name}
                            className={styles.projectLogo}
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
                    name: routes.experience.name,
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
  title: routes.experience.name,
} satisfies Metadata;

export default ExperiencePage;
