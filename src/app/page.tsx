import Image from "next/image";
import { type Graph, type Person, type WebSite } from "schema-dts";

import headShot from "@/assets/head-shot.jpg";
import {
  currentRole,
  description,
  displayTitle,
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
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-4 pt-20 pb-32">
      <header className="mb-12 text-center">
        <Image
          alt={`head shot of ${firstName} ${lastName}`}
          className="outline-accent mx-auto mb-4 rounded-full outline-4 outline-offset-4"
          height={128}
          src={headShot}
        />
        <h1 className="text-4xl font-bold">
          <span className="text-accent">{firstName}</span> {lastName}
        </h1>
        <p className="text-muted">{displayTitle}</p>
      </header>
    </main>

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
