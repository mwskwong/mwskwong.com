import { Container, Flex } from '@mantine/core';
import { type FC } from 'react';

import { Logo } from '../logo';

import classes from './styles.module.css';

export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <Container>
        <Flex align="center" gap="md" h={56}>
          <Logo />
        </Flex>
      </Container>
    </header>
  );
};
