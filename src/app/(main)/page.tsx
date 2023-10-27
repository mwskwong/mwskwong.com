import { FC } from 'react';

import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { Education } from '@/components/home/education';
import { Experience } from '@/components/home/experience';
import { FunFact } from '@/components/home/fun-fact';
import { Hero } from '@/components/home/hero';
import { SectionDivider } from '@/components/section-divider';

const bgcolors = {
  hero: 'background.body',
  about: 'background.surface',
  funFact: 'primary.solidBg',
  experience: 'background.body',
  education: 'background.surface',
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
      <SectionDivider bgcolor={bgcolors.experience} color={bgcolors.funFact} />

      <Experience color={bgcolors.experience} />
      <SectionDivider
        bgcolor={bgcolors.education}
        color={bgcolors.experience}
      />

      <Education bgcolor={bgcolors.education} />
      <SectionDivider bgcolor={bgcolors.contact} color={bgcolors.education} />

      <Contact bgcolor={bgcolors.contact} />
    </main>
    <SectionDivider bgcolor="var(--Footer-bg)" />
  </>
);

export default Home;
