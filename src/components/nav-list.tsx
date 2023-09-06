import Box, { BoxProps } from '@mui/joy/Box';
import List, { ListProps } from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Link from 'next/link';
import { FC, MouseEvent, forwardRef } from 'react';
import { nav } from '@/constants/nav';

export interface NavListProps extends Omit<BoxProps<'nav'>, 'children'> {
  orientation?: ListProps['orientation'];
  onNavItemClick?: (
    section: (typeof nav)[number],
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}

export const NavList: FC<NavListProps> = forwardRef(
  ({ orientation, onNavItemClick, ...props }, ref) => (
    <Box component="nav" ref={ref} {...props}>
      <List
        orientation={orientation}
        sx={{
          my: 0.5,
          '--List-radius': 'var(--joy-radius-md)',
          '--List-padding': '0px',
          '--List-gap': (theme) =>
            orientation === 'horizontal' ? theme.spacing(1) : '0px',
        }}
      >
        {nav
          .filter(({ id }) => id !== 'home')
          .map((section) => (
            <ListItem key={section.href}>
              <ListItemButton
                component={Link}
                href={section.href}
                onClick={(event) => onNavItemClick?.(section, event)}
              >
                {section.name}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  ),
);

NavList.displayName = 'NavList';
