import {
  Box,
  BoxProps,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Tooltip,
} from '@mui/joy';
import NextLink from 'next/link';
import { FC } from 'react';

import Logo from '@/app/icon.svg?monochrome';
import { linkedin } from '@/constants/contentful-ids';
import { home, nav } from '@/constants/nav';
import { getPlatformProfiles } from '@/lib/queries';

import { Icon } from './contentful';
import { ModeToggleButton } from './mode-toggle-button';
import { NavDrawer } from './nav-drawer';

export type HeaderProps = Omit<BoxProps<'header'>, 'children'>;
export const Header: FC<HeaderProps> = async (props) => {
  const platformProfiles = (await getPlatformProfiles()).filter(
    ({ platform }) => platform?.id !== linkedin,
  );

  return (
    <Box
      alignItems="center"
      bgcolor="background.body"
      boxShadow="inset 0 -1px var(--joy-palette-neutral-outlinedBorder)"
      component="header"
      display="flex"
      height="var(--Header-height)"
      position="sticky"
      top={0}
      zIndex="header"
      {...props}
    >
      <Container>
        <Stack
          alignItems="center"
          component="nav"
          direction="row"
          justifyContent="space-between"
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Link
              aria-label="Go to home page"
              component={NextLink}
              href={{ pathname: home.pathname, hash: home.id }}
            >
              <Logo width={30} />
            </Link>
            <List
              orientation="horizontal"
              sx={{
                '--List-radius': 'var(--joy-radius-sm)',
                '--List-padding': '0px',
                '--List-gap': '8px',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {nav.map(({ label, id, pathname }) => (
                <ListItem key={`${pathname}-${id}`}>
                  <ListItemButton
                    component={NextLink}
                    href={{ pathname, hash: id }}
                  >
                    {label}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack direction="row" spacing={1}>
            {platformProfiles.map(
              ({ platform, url }) =>
                platform && (
                  <Tooltip key={platform.id} title={`${platform.name} profile`}>
                    <IconButton
                      component="a"
                      href={url}
                      size="sm"
                      target="_blank"
                      variant="outlined"
                    >
                      <Icon contentfulId={platform.id} />
                    </IconButton>
                  </Tooltip>
                ),
            )}
            <ModeToggleButton size="sm" variant="outlined" />
            <NavDrawer
              slotProps={{
                drawerButton: {
                  size: 'sm',
                  variant: 'outlined',
                  sx: { display: { md: 'none' } },
                },
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
