import { Container, Typography } from '@mui/joy';
import { Metadata, ResolvingMetadata } from 'next';
import { FC } from 'react';
import { Article, BreadcrumbList, Graph } from 'schema-dts';

import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { home, privacyPolicy } from '@/constants/nav';
import { env } from '@/env.mjs';
import { getPrivacyPolicy } from '@/lib/queries';
import { getJsonLdPerson } from '@/lib/utils';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'full' });

const description = `${privacyPolicy.label} for ${env.NEXT_PUBLIC_SITE_DISPLAY_NAME}, detailing data handling, user consent, and compliance with PDPO and GDPR.`;

const PrivacyPolicy: FC = async () => {
  const [{ createdAt, updatedAt, content }, person] = await Promise.all([
    getPrivacyPolicy(),
    getJsonLdPerson(),
  ]);
  return (
    <>
      <main>
        <Container
          component="article"
          maxWidth="md"
          sx={{ py: 'var(--Section-paddingY)' }}
        >
          <Typography level="h1" sx={{ mb: 3, mt: 1 }}>
            {privacyPolicy.label}
          </Typography>
          {content ? <Mdx source={content} /> : null}
          <Typography sx={{ my: 2 }}>
            This Privacy Policy is subject to updates. The last revision was
            made on {dateFormatter.format(new Date(updatedAt))}. Please review
            periodically for changes.
          </Typography>
        </Container>
      </main>
      <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: `${env.NEXT_PUBLIC_SITE_DISPLAY_NAME} ${privacyPolicy.label}`,
                description,
                image: `${env.NEXT_PUBLIC_SITE_URL}/opengraph-image`,
                datePublished: createdAt,
                dateModified: updatedAt,
                url: `${env.NEXT_PUBLIC_SITE_URL}${privacyPolicy.pathname}`,
                author: { '@id': person['@id'] },
              } satisfies Article,
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
                    name: privacyPolicy.label,
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
    </>
  );
};

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const [{ openGraph }, { createdAt, updatedAt }] = await Promise.all([
    parent,
    getPrivacyPolicy(),
  ]);

  return {
    title: privacyPolicy.label,
    description,
    openGraph: {
      ...openGraph,
      type: 'article',
      authors: env.NEXT_PUBLIC_SITE_URL,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      url: privacyPolicy.pathname,
    },
    alternates: { canonical: privacyPolicy.pathname },
  } satisfies Metadata;
};

export default PrivacyPolicy;
