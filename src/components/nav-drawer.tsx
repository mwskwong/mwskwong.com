'use client';

import { MenuRounded } from '@mui/icons-material';
import Divider from '@mui/joy/Divider';
import Drawer from '@mui/joy/Drawer';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import NextLink from 'next/link';
import { FC, useState } from 'react';

import { nav } from '@/constants/nav';

import { NavBrand } from './nav-brand';

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
        <Stack component="nav" py={1.5} spacing={1.5}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            px={2}
            spacing={1}
          >
            <NavBrand />
            <ModalClose sx={{ position: 'unset' }} />
          </Stack>
          <Divider />
          <List size="lg" sx={{ '--List-padding': '0px' }}>
            {nav
              .filter(({ id }) => id !== 'home')
              .map((section) => (
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
        </Stack>
      </Drawer>
    </>
  );
};
