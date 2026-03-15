export const firstName = "Matthew";
export const middleName = "Wang Shun";
export const lastName = "Kwong";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const siteFqdn = process.env.VERCEL_PROJECT_PRODUCTION_URL!;
export const siteName = `${firstName} ${middleName
  .split(" ")
  .map((word) => word.charAt(0) + ".")
  .join("")} ${lastName}`;

export const displayTitle = "Tech Lead — Full Stack Web Developer";
export const currentRole = {
  jobTitle: "Technical Manager",
  company: { name: "The Hong Kong Jockey Club", url: "https://www.hkjc.com" },
};
