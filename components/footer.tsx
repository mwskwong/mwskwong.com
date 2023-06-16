"use client";

import {
  SiGithub,
  SiLinkedin,
  SiStackoverflow,
} from "@icons-pack/react-simple-icons";
import { IconButton, Stack, StackProps, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

import { simpleIconsClasses } from "@/theme";

const Footer: FC<StackProps<"footer">> = ({ sx, ...props }) => (
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
      Copyright © 2023 KWONG, Matthew Wang Shun
    </Typography>
    <Stack direction="row">
      <IconButton
        variant="plain"
        color="neutral"
        size="sm"
        component="a"
        href="https://www.linkedin.com/in/mwskwong/"
        target="_blank"
      >
        {<SiLinkedin className={simpleIconsClasses.root} />}
      </IconButton>
      <IconButton
        variant="plain"
        color="neutral"
        size="sm"
        component="a"
        href="https://github.com/mwskwong"
        target="_blank"
      >
        {<SiGithub className={simpleIconsClasses.root} />}
      </IconButton>
      <IconButton
        variant="plain"
        color="neutral"
        size="sm"
        component="a"
        href="https://stackoverflow.com/users/10579013/matthew-kwong"
        target="_blank"
      >
        {<SiStackoverflow className={simpleIconsClasses.root} />}
      </IconButton>
    </Stack>
  </Stack>
);

export default Footer;
