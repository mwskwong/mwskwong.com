import { Link, Separator } from "@heroui/react";
import Image from "next/image";
import { type Graph, type Person, type WebSite } from "schema-dts";

import headShot from "@/assets/head-shot.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
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
      <ThemeToggle
        className="absolute top-4 right-4 sm:top-8 sm:right-8"
        size="sm"
      />

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

      <p className="mb-4 text-pretty hyphens-auto">
        Hey, I&apos;m {firstName} {lastName}. I&apos;m a {currentRole.jobTitle}{" "}
        at{" "}
        <Link href={currentRole.company.url} rel="noreferrer" target="_blank">
          {currentRole.company.name}
        </Link>{" "}
        working on{" "}
        <Link href="https://bet.hkjc.com" rel="noreferrer" target="_blank">
          eWin
        </Link>
        .
      </p>
      <p className="mb-4 text-pretty hyphens-auto">
        My journey into web development started at university. After beginning
        my career as a System DBA, I realized I much prefer building visual,
        user-friendly applications that ordinary people can easily understand —
        even though I&apos;m quite terrible at visual design and anything
        artistic.
      </p>
      <p className="mb-4 text-pretty hyphens-auto">
        I&apos;m polite and straight to the point. What drives me is solving
        meaningful problems and seeing the solutions that I build create real
        impact.
      </p>
      <p className="mb-4 text-pretty hyphens-auto">
        If you&apos;d like to connect or chat about web development and
        technology, feel free to reach out via the links below.
      </p>

      <footer className="mt-12 flex justify-center gap-4">
        <Link href={`mailto:${email}`}> Email</Link>
        <Separator orientation="vertical" />
        <Link href={linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </Link>
        <Separator orientation="vertical" />
        <Link href={github} rel="noreferrer" target="_blank">
          GitHub
        </Link>
      </footer>
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
