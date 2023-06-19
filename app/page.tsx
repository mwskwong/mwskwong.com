import {
  getCourses,
  getCv,
  getPersonalPhoto,
  getPlatformProfiles,
  getSkillCategories,
} from "@/api";

import HomeClient from "./page-client";

const Home = async () => {
  const [cv, platformProfiles, personalPhoto, skillCategories, courses] =
    await Promise.all([
      getCv(),
      getPlatformProfiles(),
      getPersonalPhoto(),
      getSkillCategories(),
      getCourses(),
    ]);

  return (
    <HomeClient
      cv={cv}
      platformProfiles={platformProfiles}
      personalPhoto={personalPhoto}
      skillCategories={skillCategories}
      courses={courses}
    />
  );
};

export default Home;
