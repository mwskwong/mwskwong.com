'use client';

import { MenuRounded } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemButton,
} from '@mui/joy';
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
        <MenuRounded />
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
