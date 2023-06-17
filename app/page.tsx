import {
  getCv,
  getPersonalPhoto,
  getPlatformProfiles,
  getSkillCategories,
} from "@/api";

import HomeClient from "./page-client";

const Home = async () => {
  const [cv, platformProfiles, personalPhoto, skillCategories] =
    await Promise.all([
      getCv(),
      getPlatformProfiles(),
      getPersonalPhoto(),
      getSkillCategories(),
    ]);

  return (
    <HomeClient
      cv={cv}
      platformProfiles={platformProfiles}
      personalPhoto={personalPhoto}
      skillCategories={skillCategories}
    />
  );
};

export default Home;
