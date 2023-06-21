import { BoxProps } from "@mui/joy";

import { getExperiences } from "@/lib";

import ExperienceClient from "./experience-client";

// workaround until MUI Joy supports using components without specifying "use client"
const Experience = async (props: BoxProps<"section">) => {
  const experiences = (await getExperiences()).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ employmentType, ...experience }) => experience
  );

  return <ExperienceClient experiences={experiences} {...props} />;
};

export default Experience;
