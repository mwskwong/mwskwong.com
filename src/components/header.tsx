import { Container, Flex, IconButton } from '@radix-ui/themes';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import Image from 'next/image';
import { type FC } from 'react';

import { github, linkedin, routes } from '@/constants/site-config';
import { getPersonalPortrait } from '@/lib/queries';

import { Link } from './link';
import { NavLink } from './nav-link';

const nav = [
  routes.experience,
  routes.education,
  routes.blog,
  routes.guestbook,
];

const socialMedia = [
  { Icon: IconBrandGithub, href: github, name: 'GitHub' },
  { Icon: IconBrandLinkedin, href: linkedin, name: 'LinkedIn' },
];

export const Header: FC = async () => {
  const personalPortrait = await getPersonalPortrait();

  return (
    <Container asChild height="56px" px="4">
      <header>
        <Flex align="center" gap="6" height="56px">
          <Link aria-label={routes.home.name} href={routes.home}>
            {personalPortrait ? (
              <Image
                alt="personal portrait"
                className="rounded-full border-2 border-accentA-8"
                height={36}
                src={personalPortrait}
                width={36}
              />
            ) : null}
          </Link>
          <Flex align="center" flexGrow="1" gap="5" justify="end">
            {nav.map((route) => (
              <NavLink
                key={`${route.pathname}-${route.hash ?? ''}`}
                color="gray"
                href={route}
                size="2"
              >
                {route.name}
              </NavLink>
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
