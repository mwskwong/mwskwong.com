import {
  Link as RadixLink,
  type LinkProps as RadixLinkProps,
} from '@radix-ui/themes';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { type FC } from 'react';

export interface LinkProps extends Omit<RadixLinkProps, 'href'> {
  href: NextLinkProps['href'];
}

export const Link: FC<LinkProps> = ({ href, children, ...props }) => {
  const external = typeof href === 'string' && !href.startsWith('/');
  if (external) {
    return (
      <RadixLink href={href} {...props}>
        {children}
      </RadixLink>
    );
  }

  return (
    <RadixLink asChild {...props}>
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
};
