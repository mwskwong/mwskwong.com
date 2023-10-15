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
} from '@mui/joy';
import NextLink from 'next/link';
import { FC } from 'react';

import Icon from '@/app/icon.svg';
import { linkedin } from '@/constants/contentful-ids';
import { home, nav } from '@/constants/nav';
import { getPlatformProfiles } from '@/lib/get-platform-profiles';
import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

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
            <ModeToggleButton />
            <NavDrawer
              slotProps={{ drawerButton: { sx: { display: { md: 'none' } } } }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
