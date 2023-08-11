import { BoxProps } from "@mui/joy";

import { linkedin } from "@/constants/contentful-ids";
import { getCv, getPlatformProfiles } from "@/lib";

import HeroClient from "./hero-client";

// workaround until MUI Joy supports using components without specifying "use client"
const Hero = async (props: BoxProps<"section">) => {
  const [cv, platformProfiles] = await Promise.all([
    getCv(),
    getPlatformProfiles(),
  ]);
  const linkedinProfile = platformProfiles.find(
    ({ platform }) => platform?.id === linkedin
  );

  return <HeroClient cv={cv} linkedinProfile={linkedinProfile} {...props} />;
};

export default Hero;
