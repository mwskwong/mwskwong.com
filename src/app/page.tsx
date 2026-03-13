import "./global.css";

import { Anchor, Container, Divider, Text, Title } from "@mantine/core";
import Image from "next/image";
import { type WebSite, type WithContext } from "schema-dts";

import {
  currentRole,
  firstName,
  lastName,
  middleName,
  siteFqdn,
  title,
} from "@/config";

import logo from "./apple-icon.png";
import styles from "./page.module.css";
import { ColorSchemeToggle } from "@/components/color-scheme-toggle";

const Home = () => (
  <>
    <Container className={styles.container} component="main">
      <ColorSchemeToggle className={styles.colorSchemeToggle} />

      <header className={styles.header}>
        <Image alt="logo" className={styles.logo} height={128} src={logo} />
        <Title>
          <Text span inherit c="teal">
            {firstName}
          </Text>{" "}
          {lastName}
        </Title>
        <Text>{title}</Text>
      </header>

      <Text className={styles.paragraph}>
        Hi, my name is {firstName}. I am a {currentRole.jobTitle} currently
        working at{" "}
        <Anchor href={currentRole.company.url} rel="noreferrer" target="_blank">
          {currentRole.company.name}
        </Anchor>
        . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </Text>
      <Text className={styles.paragraph}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      <footer className={styles.footer}>
        <Anchor
          href={`mailto:me@${siteFqdn}}`}
          rel="noreferrer"
          target="_blank"
        >
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
          name: `${firstName} ${middleName
            .split(" ")
            .map((word) => word.charAt(0) + ".")
            .join("")} ${lastName}`,
          url: `https://${siteFqdn}`,
        } satisfies WithContext<WebSite>),
      }}
      type="application/ld+json"
    />
  </>
);

export default Home;
