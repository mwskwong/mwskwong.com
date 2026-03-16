import "./global.css";

import { Anchor, Container, Divider, Text } from "@mantine/core";
import Image from "next/image";
import { type WebSite, type WithContext } from "schema-dts";

import headShot from "@/assets/head-shot.jpg";
import { ColorSchemeToggle, Title } from "@/client-components";
import {
  currentRole,
  displayTitle,
  firstName,
  lastName,
  siteFqdn,
  siteName,
} from "@/config";

import styles from "./page.module.css";

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
        <Title />
        <Text>{displayTitle}</Text>
      </header>

      <Text className={styles.paragraph}>
        Hey, my name is {firstName} {lastName}. I&apos;m a{" "}
        {currentRole.jobTitle} at{" "}
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
        My journey into web development began at university. After starting my
        career as a System DBA, I discovered I much prefer building visual,
        user-friendly applications that ordinary people can easily understand —
        even though I&apos;m quite terrible at visual design and anything
        artistic.
      </Text>
      <Text className={styles.paragraph}>
        I&apos;m polite and straight to the point. What drives me is solving
        meaningful problems and seeing the solutions I build create real impact.
        If you&apos;d like to connect or chat about web development and
        technology, feel free to reach out via the links below.
      </Text>

      <footer className={styles.footer}>
        <Anchor href={`mailto:me@${siteFqdn}`} rel="noreferrer" target="_blank">
          Email
        </Anchor>
        <Divider orientation="vertical" />
        <Anchor
          href="https://www.linkedin.com/in/mwskwong"
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn
        </Anchor>
        <Divider orientation="vertical" />
        <Anchor
          href="https://github.com/mwskwong"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </Anchor>
      </footer>
    </Container>

    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: `https://${siteFqdn}`,
        } satisfies WithContext<WebSite>),
      }}
      type="application/ld+json"
    />
  </>
);

export default HomePage;
