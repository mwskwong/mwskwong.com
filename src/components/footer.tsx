import { SiRss } from '@icons-pack/react-simple-icons';
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
  Typography,
} from '@mui/joy';
import NextLink from 'next/link';
import { type FC } from 'react';

import { firstName, lastName, middleName } from '@/constants/content';
import { routes } from '@/constants/site-config';
import { getSocialMediaProfiles } from '@/lib/queries';

import { Icon } from './contentful';
import { Logo } from './logo';

export type FooterProps = Omit<BoxProps<'footer'>, 'children'>;
export const Footer: FC<FooterProps> = async (props) => {
  const socialMediaProfiles = await getSocialMediaProfiles();

  return (
    <Box component="footer" {...props}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          textAlign: 'center',
        }}
      >
        <Link
          aria-label="Go to home page"
          component={NextLink}
          href={routes.home}
        >
          <Logo
            alt=""
            size="xl"
            srcDark="/icon-dark.svg"
            srcLight="/icon-light.svg"
          />
        </Link>
        <Typography level="title-sm" sx={{ color: 'text.tertiary' }}>
          {lastName.toUpperCase()}, {firstName} {middleName}
        </Typography>
        <Typography level="body-sm">
          Copyright © {new Date().getFullYear()} – All right reserved
          <br />
          Branding logo designed by{' '}
          <Link
            href="https://www.upwork.com/freelancers/manojk4"
            target="_blank"
          >
            Manoj Kumar
          </Link>
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
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
                >
                  <Icon contentfulId={socialMedia.id} />
                </IconButton>
              ),
          )}
          <IconButton
            aria-label={routes.blogRssFeed.name}
            component="a"
            href={routes.blogRssFeed.pathname}
            size="sm"
            target="_blank"
          >
            <SiRss className="si" />
          </IconButton>
        </Stack>
        <List
          orientation="horizontal"
          sx={{
            '--List-radius': 'var(--joy-radius-sm)',
            '--List-padding': '0px',
            '--List-gap': 'var(--joy-spacing)',
          }}
        >
          <ListItem>
            <ListItemButton component={NextLink} href={routes.privacyPolicy}>
              {routes.privacyPolicy.name}
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};
