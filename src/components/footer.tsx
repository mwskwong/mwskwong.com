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
import { privacyPolicy, rssFeed } from '@/constants/nav';
import { getSocialMediaProfiles } from '@/lib/queries';

import { Icon } from './contentful';

export type FooterProps = Omit<BoxProps<'footer'>, 'children'>;
export const Footer: FC<FooterProps> = async (props) => {
  const socialMediaProfiles = await getSocialMediaProfiles();

  return (
    <Box component="footer" {...props}>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
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
                >
                  <Icon contentfulId={socialMedia.id} />
                </IconButton>
              ),
          )}
          <IconButton
            aria-label="RSS Feed"
            component="a"
            href={rssFeed.pathname}
            size="sm"
            target="_blank"
          >
            <SiRss viewBox="-2 -2 28 28" />
          </IconButton>
        </Stack>

        <Typography level="body-sm" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} {lastName.toUpperCase()}, {firstName}{' '}
          {middleName}
        </Typography>
        <Typography level="body-sm">
          Branding logo designed by{' '}
          <Link
            href="https://www.upwork.com/freelancers/manojk4"
            target="_blank"
          >
            Manoj Kumar
          </Link>
        </Typography>
        <List
          orientation="horizontal"
          sx={{
            mt: 8,
            '--List-radius': 'var(--joy-radius-sm)',
            '--List-padding': '0px',
            '--List-gap': 'var(--joy-spacing)',
          }}
        >
          <ListItem>
            <ListItemButton component={NextLink} href={privacyPolicy.pathname}>
              {privacyPolicy.label}
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};
