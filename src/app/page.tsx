import { Container, Section } from '@radix-ui/themes';
import { type FC } from 'react';

import { Hero } from '@/components/home/hero';

const Home: FC = () => {
  return (
    <Container>
      <Hero />
      <Section>About</Section>
      <Section>Tech Stack of this website, aka interesting facts</Section>
      <Section>Recent Experience -&gt; view all experiences </Section>
      <Section>Recent Education -&gt; view all educations </Section>
    </Container>
  );
};

export default Home;
