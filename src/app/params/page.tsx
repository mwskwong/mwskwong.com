import { Code, Container, Link, Section } from "@radix-ui/themes";
import * as DataList from "@radix-ui/themes/components/data-list";

const ParamsPage = () => (
  <Container asChild>
    <main>
      <Section>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Git SHA</DataList.Label>
            <DataList.Value>
              <Code asChild variant="ghost">
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
        </DataList.Root>
      </Section>
    </main>
  </Container>
);

export default ParamsPage;
