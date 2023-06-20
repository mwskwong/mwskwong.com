import { BoxProps } from "@mui/joy";

import getExperiences from "@/api/get-experiences";

import ExperienceClient from "./experience-client";

const Experience = async (props: BoxProps<"section">) => {
  const experiences = await getExperiences();
  return <ExperienceClient experiences={experiences} {...props} />;
};

export default Experience;
