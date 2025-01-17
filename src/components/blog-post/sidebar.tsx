import {
  Card,
  Flex,
  Heading,
  IconButton,
  Section,
  type SectionProps,
  Text,
} from "@radix-ui/themes";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import { firstName, headline, lastName } from "@/constants/me";
import { routes, siteUrl } from "@/constants/site-config";
import {
  type getBlogPostBySlug,
  getBlogPosts,
  getPersonalPortrait,
} from "@/lib/queries";
import { dateFormatter } from "@/lib/utils";

import { CopyLinkButton } from "./copy-link-button";
import styles from "./sidebar.module.css";

export interface SideBarProps
  extends Omit<SectionProps, "asChild" | "children"> {
  blogPost: NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>;
}

export const SideBar: FC<SideBarProps> = async ({ blogPost, ...props }) => {
  const [personalPortrait, featuredBlogPosts] = await Promise.all([
    getPersonalPortrait(),
    getBlogPosts().then((blogPosts) =>
      blogPosts
        .filter(({ id }) => id !== blogPost.id)
        .toSorted((a, b) => b.view - a.view)
        .slice(0, 3),
    ),
  ]);

  const url = `${siteUrl}${routes.blog.pathname}/${blogPost.slug}`;
  const shareContent = `"${blogPost.title}" by ${firstName} ${lastName}`;
  const shareOptions = [
    {
      Icon: IconBrandX,
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${shareContent}&url=${url}`,
    },
    {
      Icon: IconBrandFacebook,
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      Icon: IconBrandLinkedin,
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      Icon: IconBrandReddit,
      name: "Reddit",
      href: `http://www.reddit.com/submit/?url=${url}&title=${blogPost.title}`,
    },
  ];

  return (
    <Section asChild {...props}>
      <aside>
        <Heading size="4">Posted By</Heading>
        <Card asChild mt="4" variant="ghost">
          <Link href={routes.home.pathname}>
            <Flex align="center" gap="3">
              {personalPortrait && (
                <Image
                  alt="personal portrait"
                  className={styles.personalPortrait}
                  height={40}
                  src={personalPortrait}
                  width={40}
                />
              )}
              <div>
                <Heading asChild size="3">
                  <p>
                    {firstName} {lastName}
                  </p>
                </Heading>
                <Text color="gray" size="2">
                  {headline}
                </Text>
              </div>
            </Flex>
          </Link>
        </Card>
        <Heading mt="8" size="4">
          More Blog Posts
        </Heading>
        <Flex direction="column" gap="4" mt="4">
          {featuredBlogPosts.map(
            ({ id, publishedAt, coverImage, slug, title }) => (
              <Card key={id} asChild variant="ghost">
                <Link href={`${routes.blog.pathname}/${slug}`}>
                  <Flex align="start" gap="4">
                    {coverImage && (
                      <Image
                        alt={title}
                        className={styles.coverImage}
                        height={9 * 7}
                        src={coverImage}
                        width={16 * 7}
                      />
                    )}
                    <div>
                      <Heading className={styles.title} size="3">
                        {title}
                      </Heading>
                      <Text color="gray" size="2">
                        {dateFormatter.format(new Date(publishedAt))}
                      </Text>
                    </div>
                  </Flex>
                </Link>
              </Card>
            ),
          )}
        </Flex>
        <Flex align="center" gap="4" justify="between" mt="8">
          <Text>Share:</Text>
          <Flex gap="4">
            <CopyLinkButton />
            {shareOptions.map(({ Icon, href, name }) => (
              <IconButton
                key={name}
                asChild
                aria-label={name}
                color="gray"
                variant="ghost"
              >
                <a href={href} rel="noreferrer" target="_blank">
                  <Icon size={20} />
                </a>
              </IconButton>
            ))}
          </Flex>
        </Flex>
      </aside>
    </Section>
  );
};
