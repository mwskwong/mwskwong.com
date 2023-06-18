"use client";

import { IconButton, Sheet, SheetProps, Stack, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

import { getPlatformProfiles } from "@/api";
import { firstName, lastName, middleName } from "@/constants/data";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

interface Props extends SheetProps<"footer"> {
  platformProfiles?: Awaited<ReturnType<typeof getPlatformProfiles>>;
}

const Footer: FC<Props> = ({ platformProfiles = [], sx, ...props }) => {
  const currYear = new Date().getFullYear();

  return (
    <Sheet
      component="footer"
      variant="solid"
      invertedColors
      sx={mergeSx(
        {
          bgcolor: "neutral.800",
          "--Icon-color": (theme) => theme.vars.palette.text.secondary,
        },
        sx
      )}
      {...props}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
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
                aria-label={`Go to my ${platform?.name ?? ""} profile`}
              >
                {Icon && <Icon />}
              </IconButton>
            );
          })}
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default Footer;
