import { Flex, type FlexProps, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { type FC, Fragment } from 'react';

import { type Route } from '@/constants/site-config';

export interface BreadcrumbProps
  extends Omit<FlexProps, 'asChild' | 'children'> {
  routes: Route[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ routes, ...props }) => (
  <Flex asChild align="center" gap="2" wrap="wrap" {...props}>
    <ul>
      {routes.map(({ name, pathname }, index) => (
        <Fragment key={name}>
          <li>
            {index === routes.length - 1 ? (
              <Text size="2">{name}</Text>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid -- wrapping next/link
              <Link asChild color="gray" size="2">
                <NextLink href={pathname}>{name}</NextLink>
              </Link>
            )}
          </li>

          {index !== routes.length - 1 && (
            <Text asChild color="gray" size="2">
              <li>/</li>
            </Text>
          )}
        </Fragment>
      ))}
    </ul>
  </Flex>
);
