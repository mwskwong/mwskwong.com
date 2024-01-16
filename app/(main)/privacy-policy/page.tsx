import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { capitalize } from 'lodash-es';
import { Metadata } from 'next';
import { FC } from 'react';
import { Article, BreadcrumbList, Graph } from 'schema-dts';

import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { getPrivacyPolicy } from '@/lib/queries';
import { getJsonLdPerson } from '@/lib/utils';

const websiteDisplayName = capitalize(process.env.NEXT_PUBLIC_PROD_URL);

const dateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const description = `Privacy policy for ${websiteDisplayName}, detailing data handling, user consent, and compliance with PDPO and GDPR.`;

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
          <Typography level="h1" mb={3} mt={1}>
            Privacy Policy
          </Typography>
          {content ? <Mdx source={content} /> : null}
          <Typography my={2}>
            This Privacy Policy is subject to updates. The last revision was
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
                headline: `${websiteDisplayName} Privacy Policy`,
                description,
                image: `${baseUrl}/privacy-policy/opengraph-image`,
                datePublished: createdAt,
                dateModified: updatedAt,
                url: `${baseUrl}/privacy-policy`,
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
                    name: 'Privacy Policy',
                    item: `${baseUrl}/privacy-policy`,
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

export const generateMetadata = async () => {
  const { createdAt, updatedAt } = await getPrivacyPolicy();

  return {
    title: 'Privacy Policy',
    description,
    openGraph: {
      type: 'article',
      authors: baseUrl,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      url: '/privacy-policy',
    },
  } satisfies Metadata;
};

export default PrivacyPolicy;
