"use client";

import { Box, IconButton, Link, SheetProps, Stack, Typography } from "@mui/joy";
import mergeSx from "merge-sx";
import { FC } from "react";

import { firstName, lastName, middleName } from "@/constants/data";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

interface Props extends SheetProps<"footer"> {
  platformProfiles?: {
    platform?: {
      id: string;
      name: string;
    };
    url: string;
  }[];
}

const FooterClient: FC<Props> = ({ platformProfiles = [], sx, ...props }) => {
  const currYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={mergeSx(
        {
          bgcolor: "background.level1",
          "--Icon-color": (theme) => theme.vars.palette.text.secondary,
        },
        sx
      )}
      {...props}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography level="body2">
            {`Copyright © ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
          </Typography>
          <Typography level="body2">
            {"Branding logo designed by "}
            <Link
              href="https://www.upwork.com/freelancers/manojk4"
              target="_blank"
            >
              Manoj Kumar
            </Link>
          </Typography>
        </Box>
        <Stack direction="row">
          {platformProfiles.map(({ platform, url }) => {
            const Icon = platform?.id
              ? getIconByContentfulId(platform.id)
              : undefined;

            return (
              <IconButton
                key={platform?.id}
                variant="plain"
                color="neutral"
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

export default FooterClient;
