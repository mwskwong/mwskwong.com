import {
  Container,
  type ContainerProps,
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
  Text,
} from '@radix-ui/themes';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconMail,
  IconRss,
} from '@tabler/icons-react';
import { type FC } from 'react';

import {
  email,
  firstName,
  github,
  lastName,
  linkedin,
  stackoverflow,
  techFocus,
} from '@/constants/me';
import { routes } from '@/constants/site-config';

const links = [
  { Icon: IconMail, href: `mailto:${email}`, name: 'Email' },
  { Icon: IconBrandLinkedin, href: linkedin, name: 'LinkedIn' },
  { Icon: IconBrandGithub, href: github, name: 'GitHub' },
  { Icon: IconBrandStackoverflow, href: stackoverflow, name: 'Stack Overflow' },
  {
    Icon: IconRss,
    href: routes.blogRssFeed.pathname,
    name: routes.blogRssFeed.name,
  },
];

export type FooterProps = Omit<ContainerProps, 'asChild' | 'children'>;
// eslint-disable-next-line @typescript-eslint/require-await -- "use cache" functions must be async functions
export const Footer: FC<FooterProps> = async (props) => {
  'use cache';

  return (
    <Container asChild {...props}>
      <footer>
        <Separator size="4" />
        <Section>
          <Flex direction="column" gap="6">
            <Heading asChild size="7">
              <p>
                {firstName} {lastName}
              </p>
            </Heading>
            <Text as="p" className="max-w-xl">
              {techFocus}
            </Text>
            <Flex gap="5">
              {links.map(({ Icon, href, name }) => (
                <IconButton key={href} asChild color="gray" variant="ghost">
                  <a
                    aria-label={name}
                    href={href}
                    rel="noopener"
                    target="_blank"
                  >
                    <Icon size={20} />
                  </a>
                </IconButton>
              ))}
            </Flex>
          </Flex>
          <Text as="p" color="gray" mt="9" size="2">
            Copyright © {new Date().getFullYear()} – All right reserved
          </Text>
        </Section>
      </footer>
    </Container>
  );
};
