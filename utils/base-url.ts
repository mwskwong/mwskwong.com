const baseUrl = `https://${
  process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ??
  process.env.NEXT_PUBLIC_PROD_URL ??
  ""
}`;

export default baseUrl;
