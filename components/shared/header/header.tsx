"use client";

import { ClickAwayListener } from "@mui/base";
import { Close, Menu } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Sheet,
  SheetProps,
  Stack,
} from "@mui/joy";
import { mergeSx } from "merge-sx";
import Link from "next/link";
import { FC, useRef, useState } from "react";

import nav, { home } from "@/constants/nav";

type Props = Omit<SheetProps<"header">, "children">;

const Header: FC<Props> = ({ sx, ...props }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Sheet
      variant="outlined"
      component="header"
      sx={mergeSx(
        {
          position: "sticky",
          top: 0,
          width: "100%",
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
        },
        sx
      )}
      {...props}
    >
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
          <Stack
            spacing={1}
            direction="row"
            sx={{ alignItems: "center", textDecoration: "none" }}
            component={Link}
            href={home.href}
          >
            Logo
          </Stack>
          <Box component="nav" sx={{ display: { xs: "none", sm: "block" } }}>
            <List
              orientation="horizontal"
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
          <IconButton
            ref={menuButtonRef}
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{ display: { sm: "none" } }}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {dropdownOpen ? <Close /> : <Menu />}
          </IconButton>
        </Box>
        {dropdownOpen && (
          <ClickAwayListener
            onClickAway={(event) => {
              if (
                !menuButtonRef.current?.contains(event.target as HTMLElement)
              ) {
                setDropdownOpen(false);
              }
            }}
          >
            <Box component="nav" sx={{ display: { sm: "none" }, mx: -2 }}>
              <List>
                {nav.map(({ id, name, href }) => (
                  <ListItem key={id}>
                    <ListItemButton component={Link} href={href}>
                      {name}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </ClickAwayListener>
        )}
      </Container>
    </Sheet>
  );
};

export default Header;
