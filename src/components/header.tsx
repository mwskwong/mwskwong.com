import { ActionIcon, Burger, Button, Container, Group } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMoon,
} from '@tabler/icons-react';
import Link from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';

import classes from './header.module.css';
import { Image } from './image';

const nav = [
  routes.about,
  routes.experience,
  routes.education,
  routes.contact,
  routes.blog,
  routes.guestbook,
];

export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <Container>
        <Group gap="md" h={56} justify="space-between">
          <Burger hiddenFrom="sm" size="sm" />
          <Link href={routes.home.pathname}>
            <Image
              alt="app icon"
              height={28}
              srcDark="/icon-dark.svg"
              srcLight="/icon-light.svg"
              width={28}
            />
          </Link>
          <Group gap={0} visibleFrom="sm">
            {nav.map((route) => (
              <Button
                key={route.name}
                color="dark"
                component={Link}
                href={route}
                variant="subtle"
              >
                {route.name}
              </Button>
            ))}
          </Group>
          <Group gap="xs">
            <ActionIcon variant="default">
              <IconBrandGithub size={18} />
            </ActionIcon>
            <ActionIcon variant="default">
              <IconBrandLinkedin size={18} />
            </ActionIcon>
            <ActionIcon variant="default">
              <IconMoon size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </header>
  );
};
