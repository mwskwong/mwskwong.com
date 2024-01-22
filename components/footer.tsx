import { SiRss } from '@icons-pack/react-simple-icons';
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
  Typography,
} from '@mui/joy';
import NextLink from 'next/link';
import { FC } from 'react';

import { firstName, lastName, middleName } from '@/constants/content';
import { blogRssFeed, privacyPolicy } from '@/constants/nav';
import { getPlatformProfiles } from '@/lib/queries';

import { Icon } from './contentful';

export type FooterProps = Omit<BoxProps<'footer'>, 'children'>;
export const Footer: FC<FooterProps> = async (props) => {
  const platformProfiles = await getPlatformProfiles();
  const currYear = new Date().getFullYear();

  return (
    <Box component="footer" {...props}>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
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
                  >
                    <Icon contentfulId={platform.id} />
                  </IconButton>
                </Tooltip>
              ),
          )}
          <Tooltip title="RSS Feed">
            <IconButton
              component="a"
              href={blogRssFeed.pathname}
              size="sm"
              target="_blank"
            >
              <SiRss viewBox="-2 -2 28 28" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography level="body-sm" mt={2}>
          © {currYear} {lastName.toUpperCase()}, {firstName} {middleName}
        </Typography>
        <Typography level="body-sm">
          Branding logo designed by{' '}
          <Link
            href="https://www.upwork.com/freelancers/manojk4"
            target="_blank"
            underline="always"
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
            '--List-gap': '8px',
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
