'use client';

import {
  Box,
  Drawer,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
} from '@mui/joy';
import { Menu } from 'lucide-react';
import NextLink from 'next/link';
import { FC, useState } from 'react';

import { nav } from '@/constants/nav';

export interface NavDrawerProps {
  slotProps?: {
    drawerButton?: IconButtonProps;
  };
}

export const NavDrawer: FC<NavDrawerProps> = ({ slotProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Toggle navigation drawer">
        <IconButton onClick={() => setOpen(true)} {...slotProps?.drawerButton}>
          <Menu />
        </IconButton>
      </Tooltip>
      <Drawer anchor="right" onClose={() => setOpen(false)} open={open}>
        <Box component="nav" pb={1} pt={10} px={1}>
          <List
            size="lg"
            sx={{
              '--List-gap': (theme) => theme.spacing(1),
              '--List-padding': '0px',
              '--List-radius': (theme) => theme.vars.radius.sm,
              '--ListItem-paddingX': (theme) => theme.spacing(8),
            }}
          >
            {nav.map(({ id, label, pathname }) => (
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
