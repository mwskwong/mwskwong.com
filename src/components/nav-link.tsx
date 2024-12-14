'use client';

import {
  Link as RadixLink,
  type LinkProps as RadixLinkProps,
} from '@radix-ui/themes';
import { type LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { Link as NextLink } from 'next-view-transitions';
import { type FC } from 'react';

export interface LinkProps extends Omit<RadixLinkProps, 'href'> {
  href: NextLinkProps['href'];
}

export const NavLink: FC<LinkProps> = ({ href, children, ...props }) => {
  const pathname = usePathname();
  return (
    <RadixLink
      asChild
      highContrast={Boolean(
        typeof href === 'string'
          ? pathname.startsWith(href)
          : href.pathname && pathname.startsWith(href.pathname),
      )}
      {...props}
    >
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
};
