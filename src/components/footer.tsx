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
  IconRss,
} from '@tabler/icons-react';
import { type FC } from 'react';

import {
  firstName,
  github,
  lastName,
  linkedin,
  stackoverflow,
} from '@/constants/me';
import { routes } from '@/constants/site-config';

const links = [
  { Icon: IconBrandGithub, href: github, name: 'GitHub' },
  { Icon: IconBrandLinkedin, href: linkedin, name: 'LinkedIn' },
  { Icon: IconBrandStackoverflow, href: stackoverflow, name: 'Stack Overflow' },
  { Icon: IconRss, href: routes.blogRssFeed.pathname, name: 'blog rss ' },
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
            <Heading size="7">
              {firstName} {lastName}
            </Heading>
            <Flex gap="5">
              {links.map(({ Icon, href, name }) => (
                <IconButton key={href} asChild color="gray" variant="ghost">
                  <a
                    aria-label={name}
                    href={href}
                    rel="noopener"
                    target="_blank"
                  >
                    <Icon size={18} />
                  </a>
                </IconButton>
              ))}
            </Flex>
          </Flex>
          <Text as="p" color="gray" mt="9">
            Copyright © {new Date().getFullYear()} – All right reserved
          </Text>
        </Section>
      </footer>
    </Container>
  );
};
