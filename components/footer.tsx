import { Box, IconButton, Link, SheetProps, Stack, Typography } from "@mui/joy";
import { FC } from "react";

import { firstName, lastName, middleName } from "@/constants/content";
import { getPlatformProfiles } from "@/lib";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

const Footer: FC<SheetProps<"footer">> = async (props) => {
  const platformProfiles = await getPlatformProfiles();
  const currYear = new Date().getFullYear();

  return (
    <Box component="footer" bgcolor="background.level1" {...props}>
      <Stack spacing={2} alignItems="center">
        <Box textAlign="center">
          <Typography level="body-sm">
            {`Copyright © ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
          </Typography>
          <Typography level="body-sm">
            {"Branding logo designed by "}
            <Link
              href="https://www.upwork.com/freelancers/manojk4"
              target="_blank"
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
                key={platform?.id}
                size="sm"
                component="a"
                href={url}
                target="_blank"
                aria-label={`Go to my ${platform?.name ?? ""} profile`}
              >
                {Icon && <Icon />}
              </IconButton>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
