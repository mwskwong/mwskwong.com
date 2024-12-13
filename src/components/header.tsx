'use client';

import { Box, Container, Flex, IconButton } from '@radix-ui/themes';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';

import { github, linkedin, routes } from '@/constants/site-config';

import { Link } from './link';

const nav = [routes.blog, routes.guestbook];

const socialMedia = [
  { Icon: IconBrandGithub, href: github, name: 'GitHub' },
  { Icon: IconBrandLinkedin, href: linkedin, name: 'LinkedIn' },
];

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <Container asChild height="56px" px="4">
      <header>
        <Flex align="center" gap="6" height="56px">
          <Link aria-label={routes.home.name} href={routes.home}>
            <Box
              className="rounded-full border-2 border-accentA-8 bg-accent-2"
              height="32px"
              width="32px"
            >
              {/* my profile pic */}
            </Box>
          </Link>
          <Flex align="center" flexGrow="1" gap="5" justify="end">
            {nav.map((route) => (
              <Link
                key={`${route.pathname}-${route.hash ?? ''}`}
                color="gray"
                highContrast={pathname.startsWith(route.pathname)}
                href={route}
                size="2"
              >
                {route.name}
              </Link>
            ))}
            {socialMedia.map(({ Icon, href, name }) => (
              <IconButton key={href} asChild variant="ghost">
                <Link
                  aria-label={name}
                  color="gray"
                  href={href}
                  target="_blank"
                >
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
