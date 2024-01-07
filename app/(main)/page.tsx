import Box from '@mui/joy/Box';
import { FC } from 'react';
import { Article, BreadcrumbList, Graph } from 'schema-dts';

import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { Education } from '@/components/home/education';
import { Experience } from '@/components/home/experience';
import { FunFact } from '@/components/home/fun-fact';
import { Hero } from '@/components/home/hero';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { headline } from '@/constants/content';
import { getJsonLdPerson } from '@/lib/utils';

const bgcolors = {
  hero: 'background.body',
  about: 'background.surface',
  funFact: 'primary.solidBg',
  experience: 'background.body',
  education: 'background.surface',
  contact: 'background.body',
};

const Home: FC<{ searchParams: { showInGuestbook?: '' } }> = async ({
  searchParams,
}) => {
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
        <SectionDivider bgcolor={bgcolors.funFact} color={bgcolors.about} />

        <FunFact bgcolor={bgcolors.funFact} />
        <SectionDivider
          bgcolor={bgcolors.experience}
          color={bgcolors.funFact}
        />

        <Experience color={bgcolors.experience} />
        <SectionDivider
          bgcolor={bgcolors.education}
          color={bgcolors.experience}
        />

        <Education bgcolor={bgcolors.education} />
        <SectionDivider bgcolor={bgcolors.contact} color={bgcolors.education} />

        <Contact
          bgcolor={bgcolors.contact}
          defaultShowInGuestbook={searchParams.showInGuestbook === ''}
        />
      </Box>
      <SectionDivider bgcolor="var(--Footer-bg)" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline,
                image: `${baseUrl}/opengraph-image.png`,
                datePublished: new Date(2019, 9, 23, 0, 0, 0).toISOString(),
                dateModified: new Date().toISOString(),
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
