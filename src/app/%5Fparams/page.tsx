import { Code, Container, Link, Section } from "@radix-ui/themes";
import * as DataList from "@radix-ui/themes/components/data-list";

import { siteUrl } from "@/constants/site-config";

import styles from "./page.module.css";

const ParamsPage = () => (
  <Container asChild>
    <main>
      <Section>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Git SHA</DataList.Label>
            <DataList.Value>
              <Code asChild className={styles.codeValue} variant="ghost">
                <Link
                  rel="noreferrer"
                  target="_blank"
                  href={
                    process.env.VERCEL_GIT_COMMIT_SHA &&
                    `https://github.com/mwskwong/mwskwong.com/commit/${process.env.VERCEL_GIT_COMMIT_SHA}`
                  }
                >
                  {process.env.VERCEL_GIT_COMMIT_SHA}
                </Link>
              </Code>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Region</DataList.Label>
            <DataList.Value>
              <Code className={styles.codeValue} variant="ghost">
                {process.env.VERCEL_REGION}
              </Code>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Site URL</DataList.Label>
            <DataList.Value>
              <Link href={siteUrl} rel="noreferrer" target="_blank">
                {siteUrl}
              </Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Contentful ENV</DataList.Label>
            <DataList.Value>
              <Code className={styles.codeValue} variant="ghost">
                {process.env.CONTENTFUL_ENVIRONMENT}
              </Code>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Section>
    </main>
  </Container>
);

export const dynamic = "force-dynamic";
export default ParamsPage;
