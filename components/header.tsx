import { SheetProps } from "@mui/joy";

import { linkedin } from "@/constants/contentful-ids";
import { getPlatformProfiles } from "@/lib";

import HeaderClient from "./header-client";

const Header = async (props: SheetProps<"header">) => {
  const platformProfiles = (await getPlatformProfiles()).filter(
    ({ platform }) => platform?.id !== linkedin
  );

  return <HeaderClient platformProfiles={platformProfiles} {...props} />;
};

export default Header;
