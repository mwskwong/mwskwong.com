import { escape } from 'lodash-es';
import { type FC } from 'react';
import {
  type BreadcrumbList,
  type Comment,
  type DiscussionForumPosting,
  type Graph,
} from 'schema-dts';

import { guestbook, home } from '@/constants/nav';
import { env } from '@/env.mjs';
import { getPerson } from '@/lib/json-ld';
import { getGuestbookSubmissions } from '@/lib/queries';

export interface JsonLdProps {
  discussionForumPosting: {
    text: string;
  };
}

export const JsonLd: FC<JsonLdProps> = async ({
  discussionForumPosting: { text },
}) => {
  const [comments, person] = await Promise.all([
    getGuestbookSubmissions(),
    getPerson(),
  ]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'DiscussionForumPosting',
              author: { '@id': person['@id'] },
              datePublished: new Date(2024, 0, 10).toISOString(),
              text,
              comment: comments.map(
                ({ name, submittedAt, message }) =>
                  ({
                    '@type': 'Comment',
                    author: { '@type': 'Person', name },
                    datePublished: submittedAt.toISOString(),
                    text: escape(message),
                  }) satisfies Comment,
              ),
              headline: `${env.NEXT_PUBLIC_SITE_DISPLAY_NAME} ${guestbook.label}`,
              interactionStatistic: {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'CommentAction' },
                userInteractionCount: comments.length,
              },
              url: env.NEXT_PUBLIC_SITE_URL + guestbook.pathname,
            } satisfies DiscussionForumPosting,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  name: home.label,
                  item: env.NEXT_PUBLIC_SITE_URL,
                  position: 1,
                },
                {
                  '@type': 'ListItem',
                  name: guestbook.label,
                  position: 2,
                },
              ],
              name: 'Breadcrumbs',
            } satisfies BreadcrumbList,
            person,
          ],
        } satisfies Graph),
      }}
      type="application/ld+json"
    />
  );
};
