import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import NextLink from 'next/link';
import { FC } from 'react';

import { firstName, lastName, middleName } from '@/constants/content';
import { privacyStatement } from '@/constants/nav';
import { getPlatformProfiles } from '@/lib/queries';

import { Icon } from './contentful';

export type FooterProps = Omit<BoxProps<'footer'>, 'children'>;
export const Footer: FC<FooterProps> = async (props) => {
  const platformProfiles = await getPlatformProfiles();
  const currYear = new Date().getFullYear();

  return (
    <Box component="footer" {...props}>
      <Container>
        <Stack
          alignItems="center"
          direction={{ md: 'row' }}
          // FIXME: WORKAROUND: this is a bug, when direction contains responsive value, spacing doesn't work
          gap={4}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" />}
            flexWrap="wrap"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            spacing={1}
          >
            <Typography level="body-sm">
              {`© ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
            </Typography>
            <Link
              color="neutral"
              component={NextLink}
              href={privacyStatement.pathname}
              typography="body-sm"
            >
              {privacyStatement.label}
            </Link>
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
                    >
                      <Icon contentfulId={platform.id} />
                    </IconButton>
                  </Tooltip>
                ),
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
