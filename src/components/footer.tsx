import {
  Box,
  Flex,
  IconButton,
  Section,
  type SectionProps,
  Text,
} from "@radix-ui/themes";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconMail,
  IconRss,
} from "@tabler/icons-react";
import { type FC } from "react";

import {
  email,
  github,
  legalName,
  linkedin,
  stackoverflow,
  techFocus,
} from "@/constants/me";
import { routes } from "@/constants/site-config";

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

export type FooterProps = Omit<SectionProps, "asChild" | "children">;
export const Footer: FC<FooterProps> = (properties) => (
  <Section asChild {...properties}>
    <footer>
      <Box asChild maxWidth="50ch">
        <Text as="p" color="gray" size="2">
          {techFocus}
        </Text>
      </Box>
      <Flex gap="4" mt="6">
        {links.map(({ Icon, href, name }) => (
          <IconButton key={href} asChild color="gray" variant="ghost">
            <a
              aria-label={name}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon size={20} />
            </a>
          </IconButton>
        ))}
      </Flex>
      <Text as="p" color="gray" mt="9" size="1">
        Copyright © {new Date().getFullYear()} {legalName}
      </Text>
    </footer>
  </Section>
);
