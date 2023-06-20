import { FC } from "react";

import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Education from "@/components/home/education";
import FunFact from "@/components/home/fun-fact";
import Hero from "@/components/home/hero";
import SectionDivider from "@/components/section-divider";

const bgcolors = {
  hero: undefined,
  about: "background.level1",
  funFact: "primary.solidBg",
  experience: undefined,
  education: "background.level1",
  contact: undefined,
};

const Home: FC = () => {
  return (
    <>
      <Hero sx={{ bgcolor: bgcolors.hero }} />
      <SectionDivider sx={{ color: bgcolors.hero, bgcolor: bgcolors.about }} />
      <About sx={{ bgcolor: bgcolors.about }} />
      <SectionDivider
        sx={{ color: bgcolors.about, bgcolor: bgcolors.funFact }}
      />
      <FunFact />
      <SectionDivider
        sx={{ color: bgcolors.funFact, bgcolor: bgcolors.experience }}
      />
      <SectionDivider
        sx={{ color: bgcolors.experience, bgcolor: bgcolors.education }}
      />
      <Education sx={{ bgcolor: bgcolors.education }} />
      <SectionDivider
        sx={{ color: bgcolors.education, bgcolor: bgcolors.contact }}
      />
      <Contact sx={{ bgcolor: bgcolors.contact }} />
    </>
  );
};

export default Home;
