import { Box, Container, Flex } from "@radix-ui/themes";
import { type FC } from "react";
import { type BreadcrumbList, type Graph, type WebSite } from "schema-dts";

import { About } from "@/components/home/about";
import { FeaturedArticles } from "@/components/home/featured-articles";
import { FeaturedSkills } from "@/components/home/featured-skills";
import { Footer } from "@/components/home/footer";
import { RecentEducation } from "@/components/home/recent-education";
import { RecentExperience } from "@/components/home/recent-experience";
import { Sidebar } from "@/components/home/sidebar";
import {
  alternateSiteNames,
  routes,
  siteName,
  siteUrl,
} from "@/constants/site-config";

const Home: FC = () => {
  return (
    <>
      <Container>
        <Flex direction={{ initial: "column", md: "row" }} gapX="160px">
          <Sidebar
            position={{ md: "sticky" }}
            top="0"
            width={{ md: "350px" }}
          />
          <Box asChild flexBasis="1" flexGrow="1">
            <main>
              <About />
              <RecentExperience />
              <RecentEducation />
              <FeaturedSkills />
              <FeaturedArticles />
              <Footer />
            </main>
          </Box>
        </Flex>
      </Container>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: siteName,
                alternateName: alternateSiteNames,
                url: siteUrl,
              } satisfies WebSite,
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    name: routes.home.name,
                    position: 1,
                  },
                ],
                name: "Breadcrumbs",
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
