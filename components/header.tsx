import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import NextLink from 'next/link';
import { FC } from 'react';

import Icon from '@/app/icon.svg';
import { linkedin } from '@/constants/contentful-ids';
import { home, nav } from '@/constants/nav';
import { getPlatformProfiles } from '@/lib/queries';

import { ContentfulIcon } from './contentful-icon';
import { ModeToggleButton } from './mode-toggle-button';
import { NavDrawer } from './nav-drawer';

export type HeaderProps = Omit<BoxProps<'header'>, 'children'>;
export const Header: FC<HeaderProps> = async (props) => {
  const platformProfiles = (await getPlatformProfiles()).filter(
    ({ platform }) => platform?.id !== linkedin,
  );

  return (
    <Box
      bgcolor="background.surface"
      borderBottom={1}
      borderColor="divider"
      component="header"
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
          py={1.5}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Link
              aria-label="Go to home page"
              component={NextLink}
              href={home.href}
            >
              <Icon fontSize="var(--joy-fontSize-xl3)" width="1em" />
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
              {nav.map((section) => (
                <ListItem key={section.href}>
                  <ListItemButton component={NextLink} href={section.href}>
                    {section.name}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack direction="row" spacing={1}>
            {platformProfiles.map(
              ({ platform, url }) =>
                platform && (
                  <IconButton
                    aria-label={`Go to my ${platform.name} profile`}
                    component="a"
                    href={url}
                    key={platform.id}
                    size="sm"
                    target="_blank"
                    variant="outlined"
                  >
                    <ContentfulIcon contentfulId={platform.id} />
                  </IconButton>
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
