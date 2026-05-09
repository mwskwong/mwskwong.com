import { Link, Separator, Text } from "@heroui/react";
import Image from "next/image";
import { type Graph, type Person, type WebSite } from "schema-dts";

import headShot from "@/assets/head-shot.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  currentRole,
  description,
  firstName,
  headline,
  lastName,
  middleName,
  siteName,
  siteUrl,
} from "@/config";

const email = `me@mwskwong.com`;
const linkedin = "https://www.linkedin.com/in/mwskwong";
const github = "https://github.com/mwskwong";

const HomePage = () => (
  <>
    <main className="relative mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-4 pt-20 pb-32">
      <ThemeToggle className="absolute top-4 right-4 md:top-8" size="sm" />

      <header className="mb-12 text-center">
        <Image
          alt={`head shot of ${firstName} ${lastName}`}
          className="mx-auto mb-4 rounded-full outline-4 outline-offset-4 outline-accent"
          height={128}
          src={headShot}
        />
        <Text type="h1">
          <span className="text-accent">{firstName}</span> {lastName}
        </Text>
        <Text className="text-muted">{headline}</Text>
      </header>

      <section className="flex flex-col gap-4 text-pretty">
        <Text>
          Hey, I&apos;m {firstName} {lastName}. I&apos;m a{" "}
          {currentRole.jobTitle} at{" "}
          <Link href={currentRole.company.url} rel="noreferrer" target="_blank">
            {currentRole.company.name}
          </Link>{" "}
          working on{" "}
          <Link href="https://bet.hkjc.com" rel="noreferrer" target="_blank">
            eWin
          </Link>
          .
        </Text>
        <Text>
          My journey into web development started at university. After beginning
          my career as a System DBA, I realized I much prefer building visual,
          user-friendly applications that ordinary people can easily understand
          — even though I&apos;m quite terrible at visual design and anything
          artistic.
        </Text>
        <Text>
          I&apos;m polite and straight to the point. What drives me is solving
          meaningful problems and seeing the solutions that I build create real
          impact.
        </Text>
        <Text>
          If you&apos;d like to connect or chat about web development and
          technology, feel free to reach out via the links below.
        </Text>
      </section>

      <footer className="mt-12 flex justify-center gap-4">
        <Link href={`mailto:${email}`}>Email</Link>
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
              url: siteUrl.toString(),
              author: { "@id": "#person" },
            } satisfies WebSite,
            {
              "@type": "Person",
              "@id": "#person",
              name: `${firstName} ${lastName}`,
              alternateName: `${lastName.toUpperCase()}, ${firstName} ${middleName}`,
              jobTitle: currentRole.jobTitle,
              description,
              image: `${siteUrl}${headShot.src}`,
              url: siteUrl.toString(),
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
