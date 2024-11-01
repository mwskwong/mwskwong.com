import { type EntryFieldTypes } from "contentful";

export interface SocialMediaProfileSkeleton {
  contentTypeId: "socialMediaProfile";
  fields: {
    socialMedia: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    url: EntryFieldTypes.Symbol;
  };
}

export interface OrganizationSkeleton {
  contentTypeId: "organization";
  fields: {
    name: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    logoUniversal?: EntryFieldTypes.AssetLink;
    logoLight?: EntryFieldTypes.AssetLink;
    logoDark?: EntryFieldTypes.AssetLink;
  };
}
