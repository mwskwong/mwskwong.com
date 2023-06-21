import { SheetProps } from "@mui/joy";

import { getPlatformProfiles } from "@/lib";

import FooterClient from "./footer-client";

const Footer = async (props: SheetProps<"footer">) => {
  const platformProfiles = await getPlatformProfiles();

  return <FooterClient platformProfiles={platformProfiles} {...props} />;
};

export default Footer;
