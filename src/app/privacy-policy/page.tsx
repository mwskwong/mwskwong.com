import { Container, Typography } from '@mui/joy';
import { type Metadata, type ResolvingMetadata } from 'next';
import { type FC } from 'react';
import { type Article, type BreadcrumbList, type Graph } from 'schema-dts';

import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { routes, siteDisplayName, siteUrl } from '@/constants/site-config';
import { getPerson } from '@/lib/json-ld';
import { getPrivacyPolicy } from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'full' });

const description = `${routes.privacyPolicy.name} for ${siteDisplayName}, detailing data handling, user consent, and compliance with PDPO and GDPR.`;

const PrivacyPolicy: FC = async () => {
  const [{ createdAt, updatedAt, content }, person] = await Promise.all([
    getPrivacyPolicy(),
    getPerson(),
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
            {routes.privacyPolicy.name}
          </Typography>
          <Typography level="title-md" sx={{ my: 2 }}>
            This Privacy Policy is subject to updates. The last revision was
            made on {dateFormatter.format(new Date(updatedAt))}. Please review
            periodically for changes.
          </Typography>
          {content ? <Mdx source={content} /> : null}
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
                headline: `${siteDisplayName} ${routes.privacyPolicy.name}`,
                description,
                image: `${siteUrl}/opengraph-image`,
                datePublished: createdAt,
                dateModified: updatedAt,
                url: siteUrl + routes.privacyPolicy.pathname,
                author: { '@id': person['@id'] },
              } satisfies Article,
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
                    name: routes.privacyPolicy.name,
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
    title: routes.privacyPolicy.name,
    description,
    openGraph: {
      ...openGraph,
      type: 'article',
      authors: siteUrl,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      url: routes.privacyPolicy.pathname,
    },
    alternates: { canonical: routes.privacyPolicy.pathname },
  } satisfies Metadata;
};

export default PrivacyPolicy;
