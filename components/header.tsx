"use client";

import { ClickAwayListener, NoSsr } from "@mui/base";
import {
  CloseRounded,
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
} from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Link,
  SheetProps,
  Stack,
  useColorScheme,
} from "@mui/joy";
import mergeSx from "merge-sx";
import { FC, useRef, useState } from "react";

import Icon from "@/app/icon.svg";
import { home } from "@/constants/nav";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

import NavList from "./nav-list";

interface Props extends SheetProps<"header"> {
  platformProfiles?: {
    platform?: {
      id: string;
      name: string;
    };
    url: string;
  }[];
}

const Header: FC<Props> = ({ platformProfiles = [], sx, ...props }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mode, setMode } = useColorScheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      component="header"
      sx={mergeSx(
        {
          position: "sticky",
          top: 0,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.surface",
          zIndex: "header",
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
            <Link href={home.href} aria-label="Go to home page">
              <Icon width={32} />
            </Link>
            <NavList
              orientation="horizontal"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            {platformProfiles.map(({ platform, url }) => {
              const Icon = platform?.id
                ? getIconByContentfulId(platform.id)
                : undefined;

              return (
                <IconButton
                  key={platform?.id}
                  variant="outlined"
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
            <IconButton
              variant="outlined"
              color="neutral"
              size="sm"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              aria-label="Toggle color scheme"
            >
              <NoSsr>
                {mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
              </NoSsr>
            </IconButton>
            <IconButton
              ref={menuButtonRef}
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ display: { sm: "none" } }}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="Toggle navigation dropdown"
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
            <NavList
              sx={{ display: { sm: "none" }, mx: -1.5 }}
              onNavLinkClick={() => setDropdownOpen(false)}
            />
          </ClickAwayListener>
        )}
      </Container>
    </Box>
  );
};

export default Header;
