import {
  Container,
  type ContainerProps,
  Flex,
  IconButton,
  Popover,
} from '@radix-ui/themes';
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

export type HeaderProps = Omit<ContainerProps, 'asChild' | 'children'>;
export const Header: FC<HeaderProps> = async (props) => {
  const { url: personalPortrait } = await getPersonalPortrait();

  return (
    <Container asChild py="5" {...props}>
      <header>
        <Flex align="center" gap="6">
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
            <Popover.Root>
              <Popover.Trigger className="sm:hidden">
                <IconButton aria-label="nav menu" color="gray" variant="ghost">
                  <IconMenu size={18} />
                </IconButton>
              </Popover.Trigger>
              <Popover.Content asChild align="end">
                <Flex direction="column" minWidth="270px">
                  {nav.map(({ name, pathname }) => (
                    <Popover.Close key={pathname}>
                      <NavLink
                        className="py-rx-3"
                        color="gray"
                        href={pathname}
                        size="3"
                      >
                        {name}
                      </NavLink>
                    </Popover.Close>
                  ))}
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Flex>
        </Flex>
      </header>
    </Container>
  );
};
