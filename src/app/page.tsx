import { type Graph, type Person, type WebSite } from "schema-dts";

import headShot from "@/assets/head-shot.jpg";
import {
  currentRole,
  description,
  firstName,
  lastName,
  middleName,
  siteFqdn,
  siteName,
} from "@/config";

const email = `me@${siteFqdn}`;
const linkedin = "https://www.linkedin.com/in/mwskwong";
const github = "https://github.com/mwskwong";

const HomePage = () => (
  <>
    <div>test</div>

    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: siteName,
              url: `https://${siteFqdn}`,
              author: { "@id": "#person" },
            } satisfies WebSite,
            {
              "@type": "Person",
              "@id": "#person",
              name: `${firstName} ${lastName}`,
              alternateName: `${lastName.toUpperCase()}, ${firstName} ${middleName}`,
              jobTitle: currentRole.jobTitle,
              description,
              image: `https://${siteFqdn}${headShot.src}`,
              url: `https://${siteFqdn}`,
              email,
              worksFor: { "@type": "Organization", ...currentRole.company },
              sameAs: [linkedin, github],
              knowsAbout: [
                "Full Stack Web Development",
                "React",
                "Next.js",
                "TypeScript",
              ],
            } satisfies Person,
          ],
        } satisfies Graph),
      }}
      type="application/ld+json"
    />
  </>
);

export default HomePage;
