import {
  Button,
  Card,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import { routes } from "@/constants/site-config";
import { getArticles } from "@/lib/queries";
import { dateFormatter } from "@/lib/utils";

import styles from "./featured-articles.module.css";

export type FeaturedArticlesProps = Omit<FlexProps, "asChild" | "children">;
export const FeaturedArticles: FC<FeaturedArticlesProps> = async (
  properties,
) => {
  const articles = await getArticles();
  const featuredArticles = articles
    .toSorted((a, b) => b.view - a.view)
    .slice(0, 2);

  return (
    <Flex
      asChild
      align={{ sm: "start" }}
      direction="column"
      gap="8"
      {...properties}
    >
      <Section>
        <Heading as="h2" size="8">
          Featured Articles
        </Heading>
        <Flex direction="column" gap="8">
          {featuredArticles.map(
            ({ id, createdAt, coverPhoto, slug, title, description }) => (
              <Card key={id} asChild variant="ghost">
                <Link href={`${routes.blog.pathname}/${slug}`}>
                  <Flex
                    align="start"
                    direction={{ initial: "column-reverse", sm: "row" }}
                    gap="4"
                  >
                    {coverPhoto && (
                      <Image
                        alt={title}
                        className={styles.coverPhoto}
                        height={9 * 12}
                        src={coverPhoto}
                        width={16 * 12}
                      />
                    )}
                    <Flex direction="column" gap="2">
                      <Heading as="h3" size="4">
                        {title}
                      </Heading>
                      <Text as="p">{description}</Text>
                      <Text color="gray" size="2">
                        {dateFormatter.format(new Date(createdAt))}
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
              </Card>
            ),
          )}
        </Flex>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.blog.pathname}>
            View all Articles <IconArrowRight size={20} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
