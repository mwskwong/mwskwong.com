import { Box, Container, Flex } from '@radix-ui/themes';
import { type FC } from 'react';
import { type BreadcrumbList, type Graph, type WebSite } from 'schema-dts';

import { About } from '@/components/home/about';
import { Sidebar } from '@/components/home/sidebar';
import { firstName, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';

const Home: FC = () => {
  return (
    <>
      <Container>
        <Flex direction={{ initial: 'column', md: 'row' }} gapX="160px">
          <Sidebar
            position={{ md: 'sticky' }}
            top="0"
            width={{ md: '350px' }}
          />
          <Box asChild className="flex-1">
            <main style={{ minHeight: 3000 }}>
              <About />
            </main>
          </Box>
        </Flex>
      </Container>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                name: `${firstName} ${lastName}`,
                alternateName: ['mwskwong', 'MK'],
                url: siteUrl,
              } satisfies WebSite,
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: routes.home.name,
                    position: 1,
                  },
                ],
                name: 'Breadcrumbs',
              } satisfies BreadcrumbList,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export default Home;
