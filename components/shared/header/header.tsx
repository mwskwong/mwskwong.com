"use client";

import { SiGithub, SiStackoverflow } from "@icons-pack/react-simple-icons";
import { ClickAwayListener } from "@mui/base";
import { CloseRounded, MenuRounded } from "@mui/icons-material";
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
import { simpleIconsClasses } from "@/theme";

import Icon from "../icon";

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
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Link href={home.href}>
              <Icon width={32} />
            </Link>
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
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton
              variant="outlined"
              color="neutral"
              size="sm"
              component="a"
              href="https://github.com/mwskwong"
            >
              {<SiGithub className={simpleIconsClasses.root} />}
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              size="sm"
              component="a"
              href="https://stackoverflow.com/users/10579013/matthew-kwong"
            >
              {<SiStackoverflow className={simpleIconsClasses.root} />}
            </IconButton>
            <IconButton
              ref={menuButtonRef}
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ display: { sm: "none" } }}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {dropdownOpen ? <CloseRounded /> : <MenuRounded />}
            </IconButton>
          </Stack>
        </Stack>
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
