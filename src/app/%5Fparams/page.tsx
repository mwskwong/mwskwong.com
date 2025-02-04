import { Code, Container, Heading, Link, Section } from "@radix-ui/themes";
import * as DataList from "@radix-ui/themes/components/data-list";
import { type Metadata } from "next";
import { type FC } from "react";

import { routes, siteUrl } from "@/constants/site-config";

import styles from "./page.module.css";

const ParamsPage: FC = () => (
  <Container asChild>
    <main>
      <Section>
        <Heading size="6">{routes.params.name}</Heading>
        <DataList.Root mt="8">
          <DataList.Item>
            <DataList.Label>Commit</DataList.Label>
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
              &nbsp;(
              <Link
                href="https://vercel.com/docs/edge-network/regions#region-list"
                rel="noreferrer"
                target="_blank"
              >
                region list
              </Link>
              )
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
              <Code asChild className={styles.codeValue} variant="ghost">
                <Link
                  rel="noreferrer"
                  target="_blank"
                  href={
                    process.env.CONTENTFUL_SPACE_ID &&
                    process.env.CONTENTFUL_ENVIRONMENT &&
                    `https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`
                  }
                >
                  {process.env.CONTENTFUL_ENVIRONMENT}
                </Link>
              </Code>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Section>
    </main>
  </Container>
);

export const metadata = { title: routes.params.name } satisfies Metadata;
export const dynamic = "force-dynamic";

export default ParamsPage;
