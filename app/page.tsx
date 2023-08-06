import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Education from "@/components/home/education";
import Experience from "@/components/home/experience";
import FunFact from "@/components/home/fun-fact";
import Hero from "@/components/home/hero";
import SectionDivider from "@/components/section-divider";
import { getCourses, getEducations } from "@/lib";

const bgcolors = {
  hero: "background.body",
  about: "background.level1",
  funFact: "primary.solidBg",
  experience: "background.body",
  education: "background.level1",
  contact: "background.body",
};

const Home = async () => {
  const [educations, courses] = await Promise.all([
    getEducations(),
    getCourses(),
  ]);

  return (
    <>
      <Hero bgcolor={bgcolors.hero} />
      <SectionDivider color={bgcolors.hero} bgcolor={bgcolors.about} />
      <About bgcolor={bgcolors.about} />
      <SectionDivider color={bgcolors.about} bgcolor={bgcolors.funFact} />
      <FunFact sx={{ bgcolor: bgcolors.funFact }} />
      <SectionDivider color={bgcolors.funFact} bgcolor={bgcolors.experience} />
      <Experience color={bgcolors.experience} />
      <SectionDivider
        color={bgcolors.experience}
        bgcolor={bgcolors.education}
      />
      <Education
        bgcolor={bgcolors.education}
        educations={educations}
        courses={courses}
      />
      <SectionDivider color={bgcolors.education} bgcolor={bgcolors.contact} />
      <Contact bgcolor={bgcolors.contact} />
    </>
  );
};

export default Home;
