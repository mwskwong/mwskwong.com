import { notFound } from 'next/navigation';
import { type ComponentProps, type FC } from 'react';
import {
  type BlogPosting,
  type BreadcrumbList,
  type Graph,
  type Person,
} from 'schema-dts';

import {
  address,
  email,
  firstName,
  github,
  lastName,
  linkedin,
  selfIntroduction,
  stackoverflow,
} from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import {
  getArticleBySlug,
  getExperiences,
  getPersonalPortrait,
} from '@/lib/queries';

export interface JsonLdProps extends ComponentProps<'script'> {
  slug: Promise<string>;
}

export const JsonLd: FC<JsonLdProps> = async ({ slug, ...props }) => {
  const [article, { url: personalPortrait }, latestJobTitle] =
    await Promise.all([
      getArticleBySlug(await slug),
      getPersonalPortrait(),
      getExperiences().then((experience) => experience[0]?.jobTitle),
    ]);

  if (!article) notFound();

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.description,
              image: article.coverPhoto,
              datePublished: article.createdAt.toISOString(),
              dateModified: article.updatedAt.toISOString(),
              url: `${siteUrl}${routes.blog.pathname}/${await slug}`,
              author: { '@id': 'mwskwong' },
            } satisfies BlogPosting,
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
                  name: routes.blog.name,
                  item: siteUrl + routes.blog.pathname,
                  position: 2,
                },
                {
                  '@type': 'ListItem',
                  name: article.title,
                  position: 3,
                },
              ],
              name: 'Breadcrumbs',
            } satisfies BreadcrumbList,
            {
              '@id': 'mwskwong',
              '@type': 'Person',
              name: `${firstName} ${lastName}`,
              alternateName: 'mwskwong',
              jobTitle: latestJobTitle,
              email,
              address,
              url: siteUrl,
              image: personalPortrait,
              sameAs: [github, linkedin, stackoverflow],
              description: selfIntroduction,
            } satisfies Person,
          ],
        } satisfies Graph),
      }}
      type="application/ld+json"
      {...props}
    />
  );
};
