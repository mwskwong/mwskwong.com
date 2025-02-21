import { Box } from "@radix-ui/themes/components/box";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Link } from "@radix-ui/themes/components/link";
import { Section } from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconMail,
  IconRss,
} from "@tabler/icons-react";
import NextLink from "next/link";
import { type FC } from "react";

import {
  email,
  firstName,
  github,
  headline,
  lastName,
  linkedin,
  stackoverflow,
  techFocus,
} from "@/constants/me";
import { routes } from "@/constants/site-config";

import styles from "./sidebar.module.css";

const links = [
  { Icon: IconMail, href: `mailto:${email}`, name: "Email" },
  { Icon: IconBrandLinkedin, href: linkedin, name: "LinkedIn" },
  { Icon: IconBrandGithub, href: github, name: "GitHub" },
  { Icon: IconBrandStackoverflow, href: stackoverflow, name: "Stack Overflow" },
  {
    Icon: IconRss,
    href: routes.blogRssFeed.pathname,
    name: routes.blogRssFeed.name,
  },
];

const nav = [routes.experience, routes.education, routes.skills, routes.blog];

export type SidebarProps = Omit<FlexProps, "asChild" | "children">;
export const Sidebar: FC<SidebarProps> = (props) => (
  <Flex
    asChild
    align={{ md: "start" }}
    direction="column"
    height={{ md: "100dvh" }}
    {...props}
  >
    <Section>
      <Heading size="9">
        {firstName} {lastName}
      </Heading>
      <Heading as="h2" data-accent-color="" mt="3" size="7">
        {headline}
      </Heading>
      <Text as="p" mt="4">
        {techFocus}
      </Text>
      <Box asChild display={{ initial: "none", md: "block" }} mt="9">
        <nav>
          {nav.map(({ name, pathname }) => (
            <Flex key={name} asChild align="center" gap="3" py="3">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- wrapping next/link */}
              <Link asChild color="gray">
                <NextLink href={pathname}>
                  <Box
                    className={styles.navLinkIndicator}
                    height="1px"
                    width="32px"
                  />
                  {name}
                </NextLink>
              </Link>
            </Flex>
          ))}
        </nav>
      </Box>
      <Flex gap="5" mt={{ initial: "6", md: "auto" }}>
        {links.map(({ Icon, href, name }) => (
          <IconButton
            key={name}
            asChild
            aria-label={name}
            color="gray"
            size="3"
            variant="ghost"
          >
            <a href={href} rel="noreferrer" target="_blank">
              <Icon />
            </a>
          </IconButton>
        ))}
      </Flex>
    </Section>
  </Flex>
);
