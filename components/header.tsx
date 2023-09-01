"use client";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { NoSsr } from "@mui/base/NoSsr";
import {
  CloseRounded,
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
} from "@mui/icons-material";
import Box, { BoxProps } from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import { useColorScheme } from "@mui/joy/styles";
import NextLink from "next/link";
import { FC, useRef, useState } from "react";

import Icon from "@/app/icon.svg";
import { home } from "@/constants/nav";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

import NavList from "./nav-list";

interface Props extends Omit<BoxProps<"header">, "children"> {
  platformProfiles?: {
    platform?: {
      id: string;
      name?: string;
    };
    url?: string;
  }[];
}

const Header: FC<Props> = ({ platformProfiles = [], ...props }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mode, setMode } = useColorScheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      component="header"
      position="sticky"
      top={0}
      borderBottom={1}
      borderColor="neutral.outlinedBorder"
      bgcolor="background.surface"
      zIndex="header"
      {...props}
    >
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={1.5}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Link
              component={NextLink}
              href={home.href}
              aria-label="Go to home page"
            >
              <Icon width={32} />
            </Link>
            <NavList
              orientation="horizontal"
              display={{ xs: "none", md: "block" }}
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
              size="sm"
              sx={{ display: { md: "none" } }}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="Toggle navigation dropdown"
            >
              {dropdownOpen ? <CloseRounded /> : <MenuRounded />}
            </IconButton>
          </Stack>
        </Stack>
      </Container>
      {dropdownOpen && (
        <ClickAwayListener
          onClickAway={(event) => {
            if (!menuButtonRef.current?.contains(event.target as HTMLElement)) {
              setDropdownOpen(false);
            }
          }}
        >
          <Container
            sx={{
              position: "fixed",
              top: 56,
              left: 0,
              right: 0,
              borderBottom: 1,
              borderColor: "neutral.outlinedBorder",
              bgcolor: "background.surface",
              display: { md: "none" },
            }}
          >
            <NavList mx={-1.5} onNavItemClick={() => setDropdownOpen(false)} />
          </Container>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default Header;
