import { Box } from "@radix-ui/themes/components/box";
import { Flex } from "@radix-ui/themes/components/flex";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import {
  Section,
  type SectionProps,
} from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
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
export const Footer: FC<FooterProps> = (props) => (
  <Section asChild {...props}>
    <footer>
      <Flex
        align={{ sm: "center" }}
        direction={{ initial: "column", sm: "row" }}
        gap="8"
        justify="between"
      >
        <Flex direction="column" gap="2">
          <Box asChild maxWidth="50ch">
            <Text as="p" color="gray" size="2">
              {techFocus}
            </Text>
          </Box>
          <Text as="p" color="gray" size="1">
            Copyright © {new Date().getFullYear()} {legalName}
          </Text>
        </Flex>
        <Flex gap="4">
          {links.map(({ Icon, href, name }) => (
            <IconButton key={href} asChild color="gray" variant="ghost">
              <a aria-label={name} href={href} rel="noreferrer" target="_blank">
                <Icon size={20} />
              </a>
            </IconButton>
          ))}
        </Flex>
      </Flex>
    </footer>
  </Section>
);
