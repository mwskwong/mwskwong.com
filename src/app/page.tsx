import { Box } from '@mui/joy';
import { type FC } from 'react';
import { type BreadcrumbList, type Graph, type WebSite } from 'schema-dts';

import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { Education } from '@/components/home/education';
import { Experience } from '@/components/home/experience';
import { Hero } from '@/components/home/hero';
import { InterestingFact } from '@/components/home/interesting-fact';
import { SectionDivider } from '@/components/section-divider';
import { firstName, lastName } from '@/constants/content';
import { home } from '@/constants/nav';
import { env } from '@/env.mjs';

const bgcolors = {
  hero: 'background.body',
  about: 'background.surface',
  interestingFact: 'primary.900',
  experience: 'background.body',
  education: 'background.surface',
  contact: 'background.body',
};

const Home: FC = () => (
  <>
    <Box
      component="main"
      sx={{
        '& h2, h3, h4': {
          scrollMarginTop:
            'calc(var(--Header-height) + var(--Section-paddingY))',
        },
      }}
    >
      <Hero sx={{ bgcolor: bgcolors.hero }} />
      <SectionDivider sx={{ color: bgcolors.hero, bgcolor: bgcolors.about }} />

      <About sx={{ bgcolor: bgcolors.about }} />
      <SectionDivider
        sx={{ color: bgcolors.about, bgcolor: bgcolors.interestingFact }}
      />

      <InterestingFact
        data-joy-color-scheme="dark"
        sx={{ bgcolor: bgcolors.interestingFact }}
      />
      <SectionDivider
        sx={{ color: bgcolors.interestingFact, bgcolor: bgcolors.experience }}
      />

      <Experience sx={{ bgcolor: bgcolors.experience }} />
      <SectionDivider
        sx={{ color: bgcolors.experience, bgcolor: bgcolors.education }}
      />

      <Education sx={{ bgcolor: bgcolors.education }} />
      <SectionDivider
        sx={{ color: bgcolors.education, bgcolor: bgcolors.contact }}
      />

      <Contact sx={{ bgcolor: bgcolors.contact }} />
    </Box>
    <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              name: `${firstName} ${lastName}`,
              alternateName: ['mwskwong', 'MK'],
              url: env.NEXT_PUBLIC_SITE_URL,
            } satisfies WebSite,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  name: home.label,
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

export default Home;
