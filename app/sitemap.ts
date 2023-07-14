import { MetadataRoute } from "next";

import { getSupportingDocuments } from "@/lib";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const supportingDocuments = await getSupportingDocuments();

  return [
    {
      url: process.env.NEXT_PUBLIC_URL ?? "",
      lastModified: new Date(),
    },
    ...supportingDocuments
      .filter((doc) => Boolean(doc.fields.file?.url))
      .map((doc) => ({
        // it has been filtered above. Hence, url is guarantee to exist
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        url: `https:${doc.fields.file!.url}`,
        lastModified: doc.sys.updatedAt,
      })),
  ];
};

export default sitemap;
