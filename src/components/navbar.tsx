import {
  Box,
  type BoxProps,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from '@mui/joy';
import { mergeSx } from 'merge-sx';
import NextLink from 'next/link';
import { type FC } from 'react';

import { github, linkedin } from '@/constants/contentful-ids';
import { routes } from '@/constants/site-config';
import { getSocialMediaProfiles } from '@/lib/queries';

import { Icon as ContentfulIcon } from './contentful';
import { Logo } from './logo';
import { ModeToggleButton } from './mode-toggle-button';
import { NavDrawer } from './nav-drawer';

export const nav = [
  routes.about,
  routes.experience,
  routes.education,
  routes.contact,
  routes.blog,
  routes.guestbook,
];

export type NavbarProps = Omit<BoxProps<'header'>, 'children'>;
export const Navbar: FC<NavbarProps> = async ({ sx, ...props }) => {
  const socialMediaProfiles = (await getSocialMediaProfiles()).filter(
    ({ socialMedia }) =>
      socialMedia?.id === linkedin || socialMedia?.id === github,
  );

  return (
    <Box
      component="header"
      sx={mergeSx(
        {
          alignItems: 'center',
          bgcolor: 'background.body',
          boxShadow: 'inset 0 -1px var(--joy-palette-neutral-outlinedBorder)',
          display: 'flex',
          height: 'var(--Header-height)',
          position: 'sticky',
          top: 0,
          zIndex: 'header',
        },
        sx,
      )}
      {...props}
    >
      <Container>
        <Stack
          component="nav"
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Link
              aria-label="Go to home page"
              component={NextLink}
              href={routes.home}
            >
              <Logo
                priority
                alt=""
                srcDark="/icon-dark.svg"
                srcLight="/icon-light.svg"
              />
            </Link>
            <List
              orientation="horizontal"
              sx={{
                '--List-radius': 'var(--joy-radius-sm)',
                '--List-padding': '0px',
                '--List-gap': 'var(--joy-spacing)',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {nav.map((route) => (
                // prevent keys from starting from "/".
                // The key is being embedded in the HTML and Google thinks that's a path and try to crawl it
                <ListItem
                  key={`${route.pathname}-${route.hash ?? ''}`.slice(1)}
                >
                  <ListItemButton component={NextLink} href={route}>
                    {route.name}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack direction="row" spacing={1}>
            {socialMediaProfiles.map(
              ({ socialMedia, url }) =>
                socialMedia && (
                  <IconButton
                    key={socialMedia.id}
                    aria-label={`${socialMedia.name} profile`}
                    component="a"
                    href={url}
                    size="sm"
                    target="_blank"
                    variant="outlined"
                  >
                    <ContentfulIcon contentfulId={socialMedia.id} />
                  </IconButton>
                ),
            )}
            <ModeToggleButton size="sm" variant="outlined" />
            <NavDrawer
              nav={nav}
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
