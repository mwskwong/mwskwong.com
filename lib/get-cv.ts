import client from "./client";

const getCv = async () => {
  const asset = await client.getAsset("6mTh13ou7wM2Cs7ZC1tcdn");
  return asset.fields.file && `https:${asset.fields.file.url}`;
};

export default getCv;
