import { Flex, type FlexProps, Link, Text } from "@radix-ui/themes";
import { IconChevronRight } from "@tabler/icons-react";
import NextLink from "next/link";
import { type FC, Fragment } from "react";

import { type Route } from "@/constants/site-config";

export interface BreadcrumbProps
  extends Omit<FlexProps, "asChild" | "children"> {
  routes: Route[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ routes, ...props }) => (
  <Flex asChild align="center" gap="2" wrap="wrap" {...props}>
    <ul>
      {routes.map(({ name, pathname }) => (
        <Fragment key={name}>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link asChild color="gray" size="2">
              <NextLink href={pathname}>{name}</NextLink>
            </Link>
          </li>
          <Text asChild color="gray" size="2">
            <li>
              <IconChevronRight size={16} />
            </li>
          </Text>
        </Fragment>
      ))}
    </ul>
  </Flex>
);
