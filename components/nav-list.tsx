import {
  Box,
  BoxProps,
  List,
  ListItem,
  ListItemButton,
  ListProps,
} from "@mui/joy";
import Link from "next/link";
import React, { MouseEvent, forwardRef } from "react";
import { FC } from "react";

import nav from "@/constants/nav";

interface Props extends BoxProps<"nav"> {
  orientation?: ListProps["orientation"];
  onNavLinkClick?: (
    section: {
      id: string;
      name: string;
      href: string;
    },
    event: MouseEvent<HTMLAnchorElement>
  ) => void;
}

const NavList: FC<Props> = forwardRef(
  ({ orientation, onNavLinkClick, ...props }, ref) => (
    <Box ref={ref} component="nav" {...props}>
      <List
        orientation={orientation}
        sx={{
          "--List-radius": (theme) => theme.vars.radius.sm,
          "--List-padding": "0px",
        }}
      >
        {nav.map((section) => (
          <ListItem key={section.id}>
            <ListItemButton
              component={Link}
              href={section.href}
              onClick={(event) => onNavLinkClick?.(section, event)}
            >
              {section.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
);

NavList.displayName = "NavList";

export default NavList;
