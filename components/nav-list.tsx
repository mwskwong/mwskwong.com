import Box, { BoxProps } from "@mui/joy/Box";
import List, { ListProps } from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { FC, MouseEvent, forwardRef } from "react";

import nav from "@/constants/nav";
import useActiveSection from "@/utils/use-active-section";

interface Props extends Omit<BoxProps<"nav">, "children"> {
  orientation?: ListProps["orientation"];
  onNavItemClick?: (
    section: (typeof nav)[number],
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}

const NavList: FC<Props> = forwardRef(
  ({ orientation, onNavItemClick, ...props }, ref) => {
    const activeSection = useActiveSection();

    return (
      <Box ref={ref} component="nav" role="navigation" {...props}>
        <List
          orientation={orientation}
          sx={{
            "--List-radius": "var(--joy-radius-md)",
            "--List-padding": "0px",
            "--List-gap": (theme) =>
              orientation === "horizontal" ? theme.spacing(1) : "0px",
          }}
        >
          {nav.slice(1).map((section) => (
            <ListItem key={section.id}>
              <ListItemButton
                component="a"
                href={section.href}
                selected={section.id === activeSection.id}
                onClick={(event) => onNavItemClick?.(section, event)}
              >
                {section.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  },
);

NavList.displayName = "NavList";

export default NavList;
