'use client';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { NoSsr } from '@mui/base/NoSsr';
import {
  CloseRounded,
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
} from '@mui/icons-material';
import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import { useColorScheme } from '@mui/joy/styles';
import NextLink from 'next/link';
import { FC, useRef, useState } from 'react';

import Icon from '@/app/icon.svg';
import { home } from '@/constants/nav';
import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

import { NavList } from './nav-list';

export interface HeaderProps extends Omit<BoxProps<'header'>, 'children'> {
  platformProfiles?: {
    platform?: {
      id: string;
      name?: string;
    };
    url?: string;
  }[];
}

export const Header: FC<HeaderProps> = ({
  platformProfiles = [],
  ...props
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mode, setMode } = useColorScheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      bgcolor="background.surface"
      borderBottom={1}
      borderColor="neutral.outlinedBorder"
      component="header"
      position="sticky"
      top={0}
      zIndex="header"
      {...props}
    >
      <Container>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          py={1.5}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Link
              aria-label="Go to home page"
              component={NextLink}
              href={home.href}
            >
              <Icon width={32} />
            </Link>
            <NavList
              display={{ xs: 'none', md: 'block' }}
              orientation="horizontal"
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            {platformProfiles.map(({ platform, url }) => {
              const Icon = platform?.id
                ? getIconByContentfulId(platform.id)
                : undefined;

              return (
                <IconButton
                  aria-label={`Go to my ${platform?.name ?? ''} profile`}
                  component="a"
                  href={url}
                  key={platform?.id}
                  size="sm"
                  target="_blank"
                  variant="outlined"
                >
                  {Icon ? <Icon /> : null}
                </IconButton>
              );
            })}
            <IconButton
              aria-label="Toggle color scheme"
              onClick={() => {
                setMode(mode === 'dark' ? 'light' : 'dark');
              }}
              size="sm"
              variant="outlined"
            >
              <NoSsr>
                {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
              </NoSsr>
            </IconButton>
            <IconButton
              aria-label="Toggle navigation dropdown"
              onClick={() => {
                setDropdownOpen((prev) => !prev);
              }}
              ref={menuButtonRef}
              size="sm"
              sx={{ display: { md: 'none' } }}
              variant="outlined"
            >
              {dropdownOpen ? <CloseRounded /> : <MenuRounded />}
            </IconButton>
          </Stack>
        </Stack>
      </Container>
      {dropdownOpen ? (
        <ClickAwayListener
          onClickAway={(event) => {
            if (!menuButtonRef.current?.contains(event.target as HTMLElement)) {
              setDropdownOpen(false);
            }
          }}
        >
          <Container
            sx={{
              position: 'fixed',
              top: 'calc(var(--Header-height) - 1)',
              left: 0,
              right: 0,
              borderBottom: 1,
              borderColor: 'neutral.outlinedBorder',
              bgcolor: 'background.surface',
              display: { md: 'none' },
            }}
          >
            <NavList
              mx={-1.5}
              onNavItemClick={() => {
                setDropdownOpen(false);
              }}
            />
          </Container>
        </ClickAwayListener>
      ) : null}
    </Box>
  );
};
