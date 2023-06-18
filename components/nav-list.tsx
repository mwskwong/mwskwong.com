import {
  Box,
  BoxProps,
  List,
  ListItem,
  ListItemButton,
  ListProps,
} from "@mui/joy";
import Link from "next/link";
import React, { forwardRef } from "react";
import { FC } from "react";

import nav from "@/constants/nav";

interface Props extends BoxProps<"nav"> {
  orientation?: ListProps["orientation"];
}

const NavList: FC<Props> = forwardRef(({ orientation, ...props }, ref) => (
  <Box ref={ref} component="nav" {...props}>
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
));

NavList.displayName = "NavList";

export default NavList;
