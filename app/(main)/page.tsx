import { Box } from '@mui/joy';
import { FC } from 'react';
import { BreadcrumbList, Graph } from 'schema-dts';

import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { Education } from '@/components/home/education';
import { Experience } from '@/components/home/experience';
import { Hero } from '@/components/home/hero';
import { InterestingFact } from '@/components/home/interesting-fact';
import { SectionDivider } from '@/components/section-divider';
import { getJsonLdPerson } from '@/lib/utils';

const bgcolors = {
  hero: 'background.body',
  about: 'background.surface',
  interestingFact: 'primary.900',
  experience: 'background.body',
  education: 'background.surface',
  contact: 'background.body',
};

const Home: FC = async () => {
  const person = await getJsonLdPerson();

  return (
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
        <Hero bgcolor={bgcolors.hero} />
        <SectionDivider bgcolor={bgcolors.about} color={bgcolors.hero} />

        <About bgcolor={bgcolors.about} />
        <SectionDivider
          bgcolor={bgcolors.interestingFact}
          color={bgcolors.about}
        />

        <InterestingFact
          bgcolor={bgcolors.interestingFact}
          data-joy-color-scheme="dark"
        />
        <SectionDivider
          bgcolor={bgcolors.experience}
          color={bgcolors.interestingFact}
        />

        <Experience color={bgcolors.experience} />
        <SectionDivider
          bgcolor={bgcolors.education}
          color={bgcolors.experience}
        />

        <Education bgcolor={bgcolors.education} />
        <SectionDivider bgcolor={bgcolors.contact} color={bgcolors.education} />

        <Contact bgcolor={bgcolors.contact} />
      </Box>
      <SectionDivider bgcolor="var(--Footer-bg)" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: 'Home',
                    position: 1,
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

export default Home;
