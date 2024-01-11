import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { capitalize } from 'lodash-es';
import { Metadata, ResolvingMetadata } from 'next';
import { FC } from 'react';
import { Article, BreadcrumbList, Graph } from 'schema-dts';

import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { getPrivacyStatement } from '@/lib/queries';
import { getJsonLdPerson } from '@/lib/utils';

const websiteDisplayName = capitalize(process.env.NEXT_PUBLIC_PROD_URL);

const dateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const description = `Privacy policy for ${websiteDisplayName}, detailing data handling, user consent, and compliance with PDPO and GDPR.`;

const PrivacyStatement: FC = async () => {
  const [{ createdAt, updatedAt, content }, person] = await Promise.all([
    getPrivacyStatement(),
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
          <Typography level="h1" mb={3} mt={1}>
            Privacy Statement
          </Typography>
          {content ? <Mdx source={content} /> : null}
          <Typography my={2}>
            This Privacy Statement is subject to updates. The last revision was
            made on {dateFormatter.format(new Date(updatedAt))}. Please review
            periodically for changes.
          </Typography>
        </Container>
      </main>
      <SectionDivider bgcolor="var(--Footer-bg)" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: `${websiteDisplayName} Privacy Statement`,
                description,
                datePublished: createdAt,
                dateModified: updatedAt,
                url: `${baseUrl}/privacy-statement`,
                author: { '@id': person['@id'] },
              } satisfies Article,
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
                    name: 'Privacy Statement',
                    item: `${baseUrl}/privacy-statement`,
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
  _: object,
  parent: ResolvingMetadata,
) => {
  const title = 'Privacy Statement';
  const path = '/privacy-statement';
  const { openGraph } = await parent;

  return {
    title,
    description,
    openGraph: { ...openGraph, url: path },
  } satisfies Metadata;
};

export default PrivacyStatement;
