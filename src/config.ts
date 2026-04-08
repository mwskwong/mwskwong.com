export const firstName = "Matthew";
export const middleName = "Wang Shun";
export const lastName = "Kwong";

export const headline = "Tech Lead — Full Stack Web Developer";
export const currentRole = {
  jobTitle: "Technical Manager",
  company: { name: "The Hong Kong Jockey Club", url: "https://www.hkjc.com" },
};

export const siteFqdn =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "mwskwong.com";
export const siteName = `${firstName} ${middleName
  .split(" ")
  .map((word) => word.charAt(0) + ".")
  .join("")} ${lastName}`;
export const description = `Tech Lead & Full Stack Web Developer at ${currentRole.company.name} working on eWin. Transitioned from System DBA to building visual, user-friendly web applications that ordinary people can understand. Polite, straight to the point, and driven by solving meaningful problems that create real impact.`;
