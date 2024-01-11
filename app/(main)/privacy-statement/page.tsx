import Container from '@mui/joy/Container';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import { capitalize } from 'lodash-es';
import { Metadata, ResolvingMetadata } from 'next';
import { FC } from 'react';
import { Article, BreadcrumbList, Graph } from 'schema-dts';

import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { contactInfo } from '@/constants/content';
import { getJsonLdPerson } from '@/lib/utils';

const websiteDisplayName = capitalize(process.env.NEXT_PUBLIC_PROD_URL);

const dateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const createdAt = new Date('2024-01-11');
const updatedAt = new Date('2024-01-11');

const description = `Privacy policy for ${websiteDisplayName}, detailing data handling, user consent, and compliance with PDPO and GDPR.`;

const PrivacyStatement: FC = async () => {
  const person = await getJsonLdPerson();
  return (
    <>
      <main>
        <Container
          component="article"
          maxWidth="md"
          sx={{ py: 'var(--Section-paddingY)' }}
        >
          <Typography level="h1" mb={3}>
            Privacy Statement
          </Typography>
          <Typography level="h2" mb={3} mt={6}>
            Introduction
          </Typography>
          <Typography my={2}>
            {websiteDisplayName} respects the privacy of our visitors and is
            committed to protecting personal information. This Privacy Statement
            outlines our practices concerning the collection, use, and sharing
            of personal data in compliance with the{' '}
            <Link
              href="https://www.pcpd.org.hk/english/data_privacy_law/ordinance_at_a_Glance/ordinance.html"
              target="_blank"
              underline="always"
            >
              Personal Data (Privacy) Ordinance (PDPO)
            </Link>{' '}
            of Hong Kong and the{' '}
            <Link href="https://gdpr.eu/" target="_blank" underline="always">
              General Data Protection Regulation (GDPR)
            </Link>{' '}
            of the European Union.
          </Typography>
          <Typography level="h2" mb={3} mt={6}>
            Data Collection, Storage, and Use
          </Typography>
          <Typography my={2}>
            The following data is collected on our website:
          </Typography>
          <List marker="disc" sx={{ my: 2, '--List-padding': '0px' }}>
            <ListItem>
              <Typography level="title-md">Contact Form</Typography>
              When you provide your Name, Email, Subject, and Message through
              our contact form, we will use this information to respond to your
              inquiries or to send you requested information. The submission
              date is also recorded. This data is stored securely in{' '}
              <Link
                href="https://planetscale.com/"
                target="_blank"
                underline="always"
              >
                PlanetScale
              </Link>
              , hosted in the AWS ap-southeast-1 (Singapore) region.
            </ListItem>
            <ListItem nested>
              <ListItem sx={{ display: 'var(--_List-markerDisplay)' }}>
                <Typography level="title-md">
                  Vercel Analytics and Speed Insights
                </Typography>
                To enhance our website, we use{' '}
                <Link
                  href="https://vercel.com/analytics"
                  target="_blank"
                  underline="always"
                >
                  Vercel Web Analytics and Vercel Speed Insights
                </Link>
                . These tools collect aggregated data to provide insights into
                website usage and performance, with no individual visitor
                identification. For more information on Vercel&apos;s data
                practices, please refer to their privacy policies:
              </ListItem>
              <List marker="circle" sx={{ my: 2, '--List-padding': '0px' }}>
                <ListItem>
                  <Link
                    href="https://vercel.com/docs/analytics/privacy-policy"
                    target="_blank"
                    underline="always"
                  >
                    Vercel Web Analytics Privacy and Compliance
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://vercel.com/docs/speed-insights/privacy-policy"
                    target="_blank"
                    underline="always"
                  >
                    Vercel Speed Insights Privacy and Compliance
                  </Link>
                </ListItem>
              </List>
            </ListItem>
          </List>
          <Typography level="h2" mb={3} mt={6}>
            Your Rights
          </Typography>
          <Typography my={2}>
            Under PDPO and GDPR, you have rights over your personal data,
            including access, rectification, erasure, restriction on processing,
            data portability, and objection to processing. To exercise these
            rights, please reach out to us at the contact information below.
          </Typography>
          <Typography level="h2" mb={3} mt={6}>
            Contact Us
          </Typography>
          <Typography my={2}>
            For privacy-related questions or requests, please contact us via:
          </Typography>
          <List marker="disc" sx={{ my: 2, '--List-padding': '0px' }}>
            <ListItem>
              Email:{' '}
              <Link
                href={contactInfo.email.url}
                target="_blank"
                underline="always"
              >
                {contactInfo.email.value}
              </Link>
            </ListItem>
            <ListItem>
              Phone:{' '}
              <Link
                href={contactInfo.phone.url}
                target="_blank"
                underline="always"
              >
                {contactInfo.phone.value}
              </Link>
            </ListItem>
          </List>
          <Typography my={2}>
            We are dedicated to addressing any privacy concerns and to providing
            a fair resolution.
          </Typography>
          <Typography my={2}>
            This Privacy Statement is subject to updates. The last revision was
            made on {dateFormatter.format(updatedAt)}. Please review
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
                datePublished: createdAt.toISOString(),
                dateModified: updatedAt.toISOString(),
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
