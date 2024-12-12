'use client';

import { Box, Container, Flex, IconButton } from '@radix-ui/themes';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';

import { github, linkedin, routes } from '@/constants/site-config';

import { Link } from './link';

const nav = [routes.blog, routes.guestbook];

const socialMedia = [
  { Icon: IconBrandGithub, href: github },
  { Icon: IconBrandLinkedin, href: linkedin },
];

export const Header: FC = () => {
  const pathname = usePathname();
  // eslint-disable-next-line no-console -- debug
  console.log({ pathname });

  return (
    <Container asChild height="56px" px="4">
      <header>
        <Flex align="center" gap="6" height="56px">
          <Link href={routes.home}>
            <Box className="rounded-3 bg-accent-6" height="32px" width="32px" />
          </Link>
          <Flex align="center" flexGrow="1" gap="5" justify="end">
            {nav.map((route) => (
              <Link
                key={`${route.pathname}-${route.hash ?? ''}`}
                color="gray"
                highContrast={pathname === route.pathname}
                href={route}
                size="2"
              >
                {route.name}
              </Link>
            ))}
            {socialMedia.map(({ Icon, href }) => (
              <IconButton key={href} asChild variant="ghost">
                <Link color="gray" href={href} target="_blank">
                  <Icon size={18} />
                </Link>
              </IconButton>
            ))}
          </Flex>
        </Flex>
      </header>
    </Container>
  );
};
