import { Container } from '@radix-ui/themes';
import { type FC } from 'react';
import { type BreadcrumbList, type Graph, type WebSite } from 'schema-dts';

import { About } from '@/components/home/about';
import { Hero } from '@/components/home/hero';
import { InterestingFact } from '@/components/home/interesting-fact';
import { RecentEducation } from '@/components/home/recent-education';
import { RecentExperience } from '@/components/home/recent-experience';
import { SkillSet } from '@/components/home/skill-set';
import { firstName, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';

const Home: FC = () => {
  return (
    <>
      <Container>
        <Hero />
        <About />
        <SkillSet />
        <InterestingFact />
        <RecentExperience />
        <RecentEducation />
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
