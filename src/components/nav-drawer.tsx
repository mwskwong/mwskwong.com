'use client';

import {
  Box,
  Drawer,
  IconButton,
  type IconButtonProps,
  List,
  ListItem,
  ListItemButton,
} from '@mui/joy';
import { Menu } from 'lucide-react';
import NextLink from 'next/link';
import { type FC, useState } from 'react';

export interface NavDrawerProps {
  nav?: { id?: string; label: string; pathname: string }[];
  slotProps?: {
    drawerButton?: IconButtonProps;
  };
}

export const NavDrawer: FC<NavDrawerProps> = ({ nav = [], slotProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        aria-label="Toggle navigation drawer"
        onClick={() => setOpen(true)}
        {...slotProps?.drawerButton}
      >
        <Menu />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box component="nav" sx={{ pb: 1, pt: 10, px: 1 }}>
          <List
            size="lg"
            sx={{
              '--List-gap': (theme) => theme.spacing(1),
              '--List-padding': '0px',
              '--List-radius': (theme) => theme.vars.radius.sm,
              '--ListItem-paddingX': (theme) => theme.spacing(8),
            }}
          >
            {nav.map(({ id = '', label, pathname }) => (
              // prevent keys from starting from "/".
              // The key is being embedded in the HTML and Google thinks that's a path and try to crawl it
              <ListItem key={`${pathname}-${id}`.slice(1)}>
                <ListItemButton
                  component={NextLink}
                  href={{ pathname, hash: id }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
