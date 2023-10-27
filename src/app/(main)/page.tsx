import { FC } from 'react';

import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { FunFact } from '@/components/home/fun-fact';
import { Hero } from '@/components/home/hero';
import { SectionDivider } from '@/components/section-divider';

import { Educations } from '@/components/home/educations';
import { Experiences } from '@/components/home/experiences';

const bgcolors = {
  hero: 'background.body',
  about: 'background.surface',
  funFact: 'primary.solidBg',
  experiences: 'background.body',
  educations: 'background.surface',
  contact: 'background.body',
};

const Home: FC = () => (
  <>
    <main>
      <Hero bgcolor={bgcolors.hero} />
      <SectionDivider bgcolor={bgcolors.about} color={bgcolors.hero} />

      <About bgcolor={bgcolors.about} />
      <SectionDivider bgcolor={bgcolors.funFact} color={bgcolors.about} />

      <FunFact sx={{ bgcolor: bgcolors.funFact }} />
      <SectionDivider bgcolor={bgcolors.experiences} color={bgcolors.funFact} />

      <Experiences color={bgcolors.experiences} />
      <SectionDivider
        bgcolor={bgcolors.educations}
        color={bgcolors.experiences}
      />

      <Educations bgcolor={bgcolors.educations} />
      <SectionDivider bgcolor={bgcolors.contact} color={bgcolors.educations} />

      <Contact bgcolor={bgcolors.contact} />
    </main>
    <SectionDivider bgcolor="var(--Footer-bg)" />
  </>
);

export default Home;
