import { BoxProps } from "@mui/joy";

import getExperiences from "@/api/get-experiences";

import ExperienceClient from "./experience-client";

const Experience = async (props: BoxProps<"section">) => {
  const experience = await getExperiences();
  return <ExperienceClient {...props} />;
};

export default Experience;
