import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Container } from "@radix-ui/themes/components/container";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { containerMaxWidth, md, routes, sm } from "@/constants/site-config";
import { getBlogPosts } from "@/lib/queries";
import { dateFormatter } from "@/lib/utils";

import styles from "./page.module.css";

const BlogPage: FC = async () => {
  const blogPosts = await getBlogPosts();
  // eslint-disable-next-line unicorn/no-array-reduce
  const featuredBlogPost = blogPosts.reduce(
    (highestViewedBlogPost, blogPost) =>
      blogPost.view > highestViewedBlogPost.view
        ? blogPost
        : highestViewedBlogPost,
  );

  return (
    <Container>
      <Section asChild>
        <main>
          <Breadcrumb routes={[routes.home]} />
          <Heading mt="2" size="8">
            Blog
          </Heading>
          <Card asChild mt="8" size={{ sm: "2", md: "3" }} variant="ghost">
            <Link href={`${routes.blog.pathname}/${featuredBlogPost.slug}`}>
              <Grid asChild columns={{ sm: "2" }} gapX="5" gapY="4">
                <article>
                  <div>
                    <Box
                      className={styles.coverImageContainer}
                      overflow="hidden"
                      position="relative"
                    >
                      {featuredBlogPost.coverImage ? (
                        <Image
                          fill
                          priority
                          alt={featuredBlogPost.title}
                          className={styles.coverImage}
                          src={featuredBlogPost.coverImage}
                          sizes={[
                            `(min-width: ${containerMaxWidth}px) ${containerMaxWidth / 2}px`,
                            `(min-width: ${sm}px) 50vw`,
                            "100vw",
                          ].join(",")}
                        />
                      ) : undefined}
                    </Box>
                  </div>
                  <Flex direction="column" gap={{ initial: "2", sm: "3" }}>
                    <Heading size={{ initial: "4", xs: "6" }}>
                      {featuredBlogPost.title}
                    </Heading>
                    <Text
                      className={styles.summary}
                      size={{ initial: "3", md: "4" }}
                    >
                      {featuredBlogPost.summary}
                    </Text>
                    <Text as="p" color="gray" size={{ initial: "2", md: "3" }}>
                      {dateFormatter.format(featuredBlogPost.publishedAt)}
                    </Text>
                  </Flex>
                </article>
              </Grid>
            </Link>
          </Card>
          <Grid
            columns={{ xs: "2", md: "3" }}
            gap="5"
            mt={{ initial: "5", xs: "8" }}
          >
            {blogPosts
              .filter(({ id }) => id !== featuredBlogPost.id)
              .map(({ id, publishedAt, coverImage, slug, title, summary }) => (
                <Card key={id} asChild variant="ghost">
                  <Link href={`${routes.blog.pathname}/${slug}`}>
                    <article>
                      <Box
                        className={styles.coverImageContainer}
                        overflow="hidden"
                        position="relative"
                        style={{
                          boxShadow: "var(--base-card-surface-box-shadow)",
                        }}
                      >
                        {coverImage ? (
                          <Image
                            fill
                            alt={title}
                            className={styles.coverImage}
                            src={coverImage}
                            sizes={[
                              `(min-width: ${containerMaxWidth}px) ${containerMaxWidth / 3}px`,
                              `(min-width: ${md}px) 33vw`,
                              `(min-width: ${sm}px) 50vw`,
                              "100vw",
                            ].join(",")}
                          />
                        ) : undefined}
                      </Box>
                      <Flex direction="column" gap="2" mt="4">
                        <Heading size="4">{title}</Heading>
                        <Text as="p" className={styles.summary} size="3">
                          {summary}
                        </Text>
                        <Text as="p" color="gray" size="2">
                          {dateFormatter.format(publishedAt)}
                        </Text>
                      </Flex>
                    </article>
                  </Link>
                </Card>
              ))}
          </Grid>
        </main>
      </Section>
      <Footer />
    </Container>
  );
};

export const metadata = {
  title: routes.blog.name,
  alternates: {
    types: { "application/rss+xml": routes.blogRssFeed.pathname },
  },
} satisfies Metadata;

export default BlogPage;
