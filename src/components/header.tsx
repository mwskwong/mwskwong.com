import { ActionIcon, Burger, Container, Group } from '@mantine/core';
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
          <Group gap="md" visibleFrom="sm">
            {/* {items} */}
          </Group>
          <Group gap="xs">
            <ActionIcon size="lg" variant="default">
              <IconBrandGithub />
            </ActionIcon>
            <ActionIcon size="lg" variant="default">
              <IconBrandLinkedin />
            </ActionIcon>
            <ActionIcon size="lg" variant="default">
              <IconMoon />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </header>
  );
};
