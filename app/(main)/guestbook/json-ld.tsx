import { FC } from 'react';
import {
  BreadcrumbList,
  Comment,
  DiscussionForumPosting,
  Graph,
} from 'schema-dts';

import { baseUrl } from '@/constants/base-url';
import { guestbook } from '@/constants/nav';
import { getGuestbookSubmissions } from '@/lib/queries';
import { encodeHtmlEntities, getJsonLdPerson } from '@/lib/utils';

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
    getJsonLdPerson(),
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
                    text: encodeHtmlEntities(message),
                  }) satisfies Comment,
              ),
              headline: guestbook.label,
              interactionStatistic: {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'CommentAction' },
                userInteractionCount: comments.length,
              },
              url: baseUrl + guestbook.pathname,
            } satisfies DiscussionForumPosting,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  name: 'Home',
                  item: baseUrl,
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
