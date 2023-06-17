"use client";

import { IconButton, Stack, StackProps, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

import { getPlatformProfiles } from "@/api";
import { firstName, lastName, middleName } from "@/constants/data";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

interface Props extends StackProps<"footer"> {
  platformProfiles?: Awaited<ReturnType<typeof getPlatformProfiles>>;
}

const Footer: FC<Props> = ({ platformProfiles = [], sx, ...props }) => {
  const currYear = new Date().getFullYear();

  return (
    <Stack
      component="footer"
      spacing={2}
      sx={mergeSx(
        {
          alignItems: "center",
          bgcolor: "background.level1",
          "--Icon-color": (theme) => theme.vars.palette.text.secondary,
        },
        sx
      )}
      {...props}
    >
      <Typography level="body2">
        {`Copyright © ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
      </Typography>
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
            >
              {Icon && <Icon />}
            </IconButton>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Footer;
