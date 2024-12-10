import { Box, Container, Flex, Link } from '@radix-ui/themes';
import NextLink from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';

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
    <Container asChild height="56px" px="4">
      <header>
        <Flex align="center" gap="6" height="56px">
          <Box className="rounded-3 bg-accent-6" height="32px" width="32px" />
          <Flex gap="6">
            {nav.map((route) => (
              <Link
                key={`${route.name}-${route.hash ?? ''}`}
                asChild
                color="gray"
                size="2"
              >
                <NextLink href={route}>{route.name}</NextLink>
              </Link>
            ))}
          </Flex>
        </Flex>
      </header>
    </Container>
  );
};
