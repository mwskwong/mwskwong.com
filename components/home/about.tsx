import { BoxProps } from "@mui/joy";

import { getPersonalPhoto, getSkillCategories } from "@/lib";

import AboutClient from "./about-client";

const About = async (props: BoxProps<"section">) => {
  const [personalPhoto, skillCategories] = await Promise.all([
    getPersonalPhoto(),
    getSkillCategories(),
  ]);

  return (
    <AboutClient
      personalPhoto={personalPhoto}
      skillCategories={skillCategories}
      {...props}
    />
  );
};

export default About;
