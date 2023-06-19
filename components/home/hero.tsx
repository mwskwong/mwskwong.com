import { BoxProps } from "@mui/joy";

import { getCv, getPlatformProfiles } from "@/api";
import { linkedin } from "@/constants/contentful-ids";

import HeroClient from "./hero-client";

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
