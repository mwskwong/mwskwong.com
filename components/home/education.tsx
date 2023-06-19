import { BoxProps } from "@mui/joy";

import { getCourses } from "@/api";

import EducationClient from "./education-client";

const Education = async (props: BoxProps<"section">) => {
  const [courses] = await Promise.all([getCourses()]);

  return <EducationClient courses={courses} {...props} />;
};

export default Education;
