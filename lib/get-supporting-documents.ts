import client from "./client";

const getSupportingDocuments = async () => {
  const assets = await client.getAssets({
    "metadata.tags.sys.id[in]": ["supportingDocument"],
  });

  return assets.items;
};

export default getSupportingDocuments;
