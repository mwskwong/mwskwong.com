import { Container, DropdownMenu, Flex, IconButton } from '@radix-ui/themes';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMenu,
} from '@tabler/icons-react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { type FC } from 'react';

import { github, linkedin } from '@/constants/me';
import { routes } from '@/constants/site-config';
import { getPersonalPortrait } from '@/lib/queries';

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
  const { url: personalPortrait } = await getPersonalPortrait();

  return (
    <Container asChild height="56px" px="4">
      <header>
        <Flex align="center" gap="6" height="56px">
          <Link aria-label={routes.home.name} href={routes.home.pathname}>
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
            {nav.map(({ name, pathname }) => (
              <NavLink
                key={name}
                className="hidden sm:block"
                color="gray"
                href={pathname}
                size="2"
              >
                {name}
              </NavLink>
            ))}
            {socialMedia.map(({ Icon, href, name }) => (
              <IconButton key={href} asChild color="gray" variant="ghost">
                <a aria-label={name} href={href} rel="noopener" target="_blank">
                  <Icon size={18} />
                </a>
              </IconButton>
            ))}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="sm:hidden">
                <IconButton color="gray" variant="ghost">
                  <IconMenu size={18} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" color="gray">
                {nav.map(({ name, pathname }) => (
                  <DropdownMenu.Item key={pathname} asChild>
                    <Link href={pathname}>{name}</Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Flex>
      </header>
    </Container>
  );
};
