import { Anchor, Container, Divider, Text, Title } from "@mantine/core";
import Image from "next/image";
import { type WebSite, type WithContext } from "schema-dts";

import { firstName, lastName, middleName, siteFqdn } from "@/config";

import logo from "./apple-icon.png";
import styles from "./page.module.css";

const Home = () => (
  <>
    <Container className={styles.container} component="main">
      <header className={styles.header}>
        <Image alt="logo" className={styles.logo} height={128} src={logo} />
        <Title>Matthew Kwong</Title>
        <Text>Full Stack Web Engineer</Text>
      </header>

      <Text className={styles.paragraph}>
        Dummy text: Hey, my name is Matthew Kwong. I am a technical manager
        currently working at{" "}
        <Anchor href="https://www.hkjc.com" rel="noreferrer" target="_blank">
          The Hong Kong Jockey Club
        </Anchor>
        . I love improving workflows and creating great experiences for
        developers and end users. I think every developer should have access to
        great tools that make creating performant applications seamless, which
        is one of the main reasons I enjoy working with open-source tech.
      </Text>
      <Text className={styles.paragraph}>
        I am always interested in new projects, tech, and ways people use
        Next.js. If you would like to connect, feel free to reach out via the
        links below.
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
