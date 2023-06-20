import { BoxProps } from "@mui/joy";

import { getCourses } from "@/api";
import getEducations from "@/api/get-educations";

import EducationClient from "./education-client";

const Education = async (props: BoxProps<"section">) => {
  const [educations, courses] = await Promise.all([
    getEducations(),
    getCourses(),
  ]);

  return (
    <EducationClient educations={educations} courses={courses} {...props} />
  );
};

export default Education;
