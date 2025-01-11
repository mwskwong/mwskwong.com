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
import { getBlogPosts } from "@/lib/queries";
import { dateFormatter } from "@/lib/utils";

import styles from "./featured-blog-posts.module.css";

export type FeaturedBlogPostsProps = Omit<FlexProps, "asChild" | "children">;
export const FeaturedBlogPosts: FC<FeaturedBlogPostsProps> = async (props) => {
  const blogPosts = await getBlogPosts();
  const featuredBlogPosts = blogPosts
    .toSorted((a, b) => b.view - a.view)
    .slice(0, 2);

  return (
    <Flex asChild align={{ sm: "start" }} direction="column" gap="8" {...props}>
      <Section>
        <Heading as="h2" size="8">
          Featured BlogPosts
        </Heading>
        <Flex direction="column" gap="8">
          {featuredBlogPosts.map(
            ({ id, publishedAt, coverImage, slug, title, summary }) => (
              <Card key={id} asChild variant="ghost">
                <Link href={`${routes.blog.pathname}/${slug}`}>
                  <Flex
                    align="start"
                    direction={{ initial: "column-reverse", sm: "row" }}
                    gap="4"
                  >
                    {coverImage && (
                      <Image
                        alt={title}
                        className={styles.coverImage}
                        height={9 * 12}
                        src={coverImage}
                        width={16 * 12}
                      />
                    )}
                    <Flex direction="column" gap="2">
                      <Heading as="h3" size="4">
                        {title}
                      </Heading>
                      <Text as="p">{summary}</Text>
                      <Text color="gray" size="2">
                        {dateFormatter.format(new Date(publishedAt))}
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
            View all BlogPosts <IconArrowRight size={20} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
