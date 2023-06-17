import {
  Box,
  BoxProps,
  List,
  ListItem,
  ListItemButton,
  ListProps,
} from "@mui/joy";
import Link from "next/link";
import React from "react";
import { FC } from "react";

import nav from "@/constants/nav";

interface Props extends BoxProps<"nav"> {
  orientation?: ListProps["orientation"];
}

const NavList: FC<Props> = ({ orientation, ...props }) => (
  <Box component="nav" {...props}>
    <List
      orientation={orientation}
      sx={{
        "--List-radius": (theme) => theme.vars.radius.sm,
        "--List-padding": "0px",
      }}
    >
      {nav.map(({ id, name, href }) => (
        <ListItem key={id}>
          <ListItemButton component={Link} href={href}>
            {name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default NavList;
