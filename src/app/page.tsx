import { Anchor, Container, Divider, Text, Title } from "@mantine/core";
import Image from "next/image";
import { type Graph, type Person, type WebSite } from "schema-dts";

import headShot from "@/assets/head-shot.jpg";
import { ColorSchemeToggle } from "@/components/color-scheme-toggle";
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

import styles from "./page.module.css";

const email = `me@${siteFqdn}`;
const linkedin = "https://www.linkedin.com/in/mwskwong";
const github = "https://github.com/mwskwong";

const HomePage = () => (
  <>
    <Container className={styles.container} component="main" size="sm">
      <ColorSchemeToggle className={styles.colorSchemeToggle} />

      <header className={styles.header}>
        <Image
          alt={`head shot of ${firstName} ${lastName}`}
          className={styles.headShot}
          height={128}
          src={headShot}
        />
        <Title>
          <Text c="teal" inherit span>
            {firstName}
          </Text>{" "}
          {lastName}
        </Title>
        <Text>{displayTitle}</Text>
      </header>

      <Text className={styles.paragraph}>
        Hey, I&apos;m {firstName} {lastName}. I&apos;m a {currentRole.jobTitle}{" "}
        at{" "}
        <Anchor href={currentRole.company.url} rel="noreferrer" target="_blank">
          {currentRole.company.name}
        </Anchor>{" "}
        working on{" "}
        <Anchor href="https://bet.hkjc.com" rel="noreferrer" target="_blank">
          eWin
        </Anchor>
        .
      </Text>
      <Text className={styles.paragraph}>
        My journey into web development started at university. After beginning
        my career as a System DBA, I realized I much prefer building visual,
        user-friendly applications that ordinary people can easily understand —
        even though I&apos;m quite terrible at visual design and anything
        artistic.
      </Text>
      <Text className={styles.paragraph}>
        I&apos;m polite and straight to the point. What drives me is solving
        meaningful problems and seeing the solutions that I build create real
        impact.
      </Text>
      <Text className={styles.paragraph}>
        If you&apos;d like to connect or chat about web development and
        technology, feel free to reach out via the links below.
      </Text>

      <footer className={styles.footer}>
        <Anchor href={`mailto:${email}`}> Email</Anchor>
        <Divider orientation="vertical" />
        <Anchor href={linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </Anchor>
        <Divider orientation="vertical" />
        <Anchor href={github} rel="noreferrer" target="_blank">
          GitHub
        </Anchor>
      </footer>
    </Container>

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
