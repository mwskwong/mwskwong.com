import { Container, Section } from '@radix-ui/themes';
import { type FC } from 'react';

import { About } from '@/components/home/about';
import { Hero } from '@/components/home/hero';
import { InterestingFact } from '@/components/home/interesting-fact';
import { SkillSet } from '@/components/home/skill-set';

const Home: FC = () => {
  return (
    <Container>
      <Hero />
      <About />
      <SkillSet />
      <InterestingFact />
      <Section>Recent Experience -&gt; view all experiences </Section>
      <Section>Recent Education -&gt; view all educations </Section>
    </Container>
  );
};

export default Home;
