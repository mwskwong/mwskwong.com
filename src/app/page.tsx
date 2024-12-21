import { Container, Section } from '@radix-ui/themes';
import { type FC } from 'react';
import { type BreadcrumbList, type Graph, type WebSite } from 'schema-dts';

import { About } from '@/components/home/about';
import { Hero } from '@/components/home/hero';
import { InterestingFact } from '@/components/home/interesting-fact';
import { SkillSet } from '@/components/home/skill-set';
import { firstName, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';

const Home: FC = () => {
  return (
    <>
      {' '}
      <Container>
        <Hero />
        <About />
        <SkillSet />
        <InterestingFact />
        <Section>Recent Experience -&gt; view all experiences </Section>
        <Section>Recent Education -&gt; view all educations </Section>
      </Container>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                name: `${firstName} ${lastName}`,
                alternateName: ['mwskwong', 'MK'],
                url: siteUrl,
              } satisfies WebSite,
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: routes.home.name,
                    position: 1,
                  },
                ],
                name: 'Breadcrumbs',
              } satisfies BreadcrumbList,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export default Home;
