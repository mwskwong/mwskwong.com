import {
  Card,
  Flex,
  Heading,
  IconButton,
  Section,
  type SectionProps,
  Text,
} from '@radix-ui/themes';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandX,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { firstName, headline, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import {
  type getArticleBySlug,
  getArticles,
  getPersonalPortrait,
} from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

export interface SideBarProps
  extends Omit<SectionProps, 'asChild' | 'children'> {
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>;
}

export const SideBar: FC<SideBarProps> = async ({ article, ...props }) => {
  const [{ url: personalPortrait }, featuredArticles] = await Promise.all([
    getPersonalPortrait(),
    getArticles().then((articles) =>
      articles
        .filter(({ id }) => id !== article.id)
        .toSorted((a, b) => b.view - a.view)
        .slice(0, 3),
    ),
  ]);

  const url = `${siteUrl}${routes.blog.pathname}/${article.slug}`;
  const shareContent = `"${article.title}" by ${firstName} ${lastName}`;
  const shareOptions = [
    {
      Icon: IconBrandX,
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${shareContent}&url=${url}`,
    },
    {
      Icon: IconBrandFacebook,
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      Icon: IconBrandLinkedin,
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      Icon: IconBrandReddit,
      name: 'Reddit',
      href: `http://www.reddit.com/submit/?url=${url}&title=${article.title}`,
    },
  ];

  return (
    <Section asChild {...props}>
      <aside>
        <Heading size="4">Posted By</Heading>
        <Card asChild mt="4" variant="ghost">
          <Link href={routes.home.pathname}>
            <Flex align="center" gap="3">
              {personalPortrait ? (
                <Image
                  alt="personal portrait"
                  className="rounded-full border-2 border-accentA-8"
                  height={40}
                  src={personalPortrait}
                  width={40}
                />
              ) : null}
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
          More articles
        </Heading>
        <Flex direction="column" gap="4" mt="4">
          {featuredArticles.map(
            ({ id, createdAt, coverPhoto, slug, title }) => (
              <Card key={id} asChild variant="ghost">
                <Link href={`${routes.blog.pathname}/${slug}`}>
                  <Flex align="start" gap="4">
                    {coverPhoto ? (
                      <Image
                        alt={title}
                        className="rounded-[var(--card-border-radius)]"
                        height={9 * 6}
                        src={coverPhoto}
                        width={16 * 6}
                        style={{
                          boxShadow: 'var(--base-card-surface-box-shadow)',
                        }}
                      />
                    ) : null}
                    <div>
                      <Heading className="line-clamp-2" size="3">
                        {title}
                      </Heading>
                      <Text color="gray" size="2">
                        {dateFormatter.format(new Date(createdAt))}
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
            {shareOptions.map(({ Icon, href, name }) => (
              <IconButton
                key={name}
                asChild
                aria-label={name}
                color="gray"
                variant="ghost"
              >
                <a href={href} rel="noopener" target="_blank">
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
