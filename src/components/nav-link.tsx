'use client';

import { usePathname } from 'next/navigation';
import { type FC } from 'react';

import { Link, type LinkProps } from './link';

export type NavLinkProps = LinkProps;
export const NavLink: FC<LinkProps> = ({ href, ...props }) => {
  const pathname = usePathname();
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content -- enforced by props passed in
    <Link
      href={href}
      highContrast={Boolean(
        typeof href === 'string'
          ? pathname.startsWith(href)
          : href.pathname && pathname.startsWith(href.pathname),
      )}
      {...props}
    />
  );
};
