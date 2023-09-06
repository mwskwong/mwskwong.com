import Box, { BoxProps } from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { firstName, lastName, middleName } from '@/constants/content';
import { getPlatformProfiles } from '@/lib/get-platform-profiles';
import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

export const Footer: FC<Omit<BoxProps<'footer'>, 'children'>> = async (
  props,
) => {
  const platformProfiles = await getPlatformProfiles();
  const currYear = new Date().getFullYear();

  return (
    <Box component="footer" {...props}>
      <Stack alignItems="center" spacing={2}>
        <Box textAlign="center">
          <Typography level="body-sm">
            {`Copyright © ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
          </Typography>
          <Typography level="body-sm">
            {'Branding logo designed by '}
            <Link
              href="https://www.upwork.com/freelancers/manojk4"
              target="_blank"
              underline="always"
            >
              Manoj Kumar
            </Link>
          </Typography>
        </Box>
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
              >
                {Icon ? <Icon /> : null}
              </IconButton>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
