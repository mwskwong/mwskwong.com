import { orderBy } from "lodash-es";
import { cache } from "react";

import client from "./client";
import { PlatformProfileSkeleton } from "./types";

const getPlatformProfiles = cache(async () => {
  console.log("getPlatformProfiles called");
  const { items } = await client.getEntries<PlatformProfileSkeleton>({
    content_type: "platformProfile",
  });

  const platformProfiles = items.map((item) => ({
    ...item.fields,
    platform: item.fields.platform && {
      id: item.fields.platform.sys.id,
      name: item.fields.platform.fields.name,
    },
  }));

  return orderBy(platformProfiles, "platform.name");
});

export default getPlatformProfiles;
