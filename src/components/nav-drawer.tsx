'use client';

import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
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
      <IconButton
        aria-label="Toggle navigation drawer"
        onClick={() => setOpen(true)}
        size="sm"
        variant="outlined"
        {...slotProps?.drawerButton}
      >
        <Menu />
      </IconButton>
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
            {nav.map((section) => (
              <ListItem key={section.href}>
                <ListItemButton
                  component={NextLink}
                  href={section.href}
                  onClick={() => setOpen(false)}
                >
                  {section.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
