import { contentful } from "./clients";
import { type SocialMediaProfileSkeleton } from "./content-types";
import { orderBy } from "lodash-es";

export const getSocialMediaProfiles = async () => {
  "use cache";

  const { items } = await contentful.getEntries<SocialMediaProfileSkeleton>({
    content_type: "socialMediaProfile",
  });

  const socialMediaProfiles = items.map((item) => ({
    ...item.fields,
    socialMedia: item.fields.socialMedia && {
      id: item.fields.socialMedia.sys.id,
      name: item.fields.socialMedia.fields.name,
    },
  }));

  return orderBy(socialMediaProfiles, "socialMedia.name");
};
