import Box, { BoxProps } from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

import { firstName, lastName, middleName } from "@/constants/content";
import getPlatformProfiles from "@/lib/get-platform-profiles";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

const Footer: FC<Omit<BoxProps<"footer">, "children">> = async (props) => {
  const platformProfiles = await getPlatformProfiles();
  const currYear = new Date().getFullYear();

  return (
    <Box component="footer" {...props}>
      <Stack spacing={2} alignItems="center">
        <Box textAlign="center">
          <Typography level="body-sm">
            {`Copyright © ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
          </Typography>
          <Typography level="body-sm">
            {"Branding logo designed by "}
            <Link
              underline="always"
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
