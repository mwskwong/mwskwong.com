import { Avatar } from "@radix-ui/themes/components/avatar";
import { Badge } from "@radix-ui/themes/components/badge";
import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Container } from "@radix-ui/themes/components/container";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { type Metadata } from "next";
import { type BreadcrumbList, type Graph } from "schema-dts";

import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { SkillCategoryIcons } from "@/components/skill-category-icons";
import { routes, siteUrl } from "@/constants/site-config";
import { getSkillSet } from "@/lib/queries";

import styles from "./page.module.css";

const SkillsPage = async () => {
  const skillSet = await getSkillSet();

  return (
    <>
      <Container>
        <main>
          <Section>
            <Breadcrumb routes={[routes.home]} />
            <Heading mt="2" size="9">
              Skills
            </Heading>
            <Box className={styles.skillSetContainer} mt="8">
              {skillSet.map(({ id, name, skills }) => {
                const Icon = SkillCategoryIcons[id];
                return (
                  <Card key={id}>
                    <Flex asChild align="center" gap="3">
                      <Heading as="h2" size="4">
                        {Icon && <Avatar fallback={<Icon />} size="4" />}
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
                            <a href={url} rel="noreferrer" target="_blank">
                              {name}
                            </a>
                          ) : (
                            name
                          )}
                        </Badge>
                      ))}
                    </Flex>
                    {Icon && (
                      <Icon className={styles.backgroundIcon} size={200} />
                    )}
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
                    name: routes.skills.name,
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
  title: routes.skills.name,
} satisfies Metadata;

export default SkillsPage;
