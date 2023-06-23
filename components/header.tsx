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
  SheetProps,
  Stack,
  useColorScheme,
} from "@mui/joy";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { mergeSx } from "merge-sx";
import { FC, useRef, useState } from "react";

import { home } from "@/constants/nav";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";
import loadFramerMotionFeatures from "@/utils/load-framer-motion-features";

import Icon from "./icon";
import NavList from "./nav-list";

const MotionClose = m(CloseRounded);
const MotionMenu = m(MenuRounded);
const MotionLightMode = m(LightModeRounded);
const MotionDarkMode = m(DarkModeRounded);
const MotionNavList = m(NavList);

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
        <LazyMotion features={loadFramerMotionFeatures} strict>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              py: 1.5,
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <a href={home.href} aria-label="Go to home page">
                <Icon width={32} />
              </a>
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
                <AnimatePresence initial={false}>
                  <NoSsr>
                    {mode === "dark" ? (
                      <MotionLightMode
                        initial={{ rotate: -45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -45, opacity: 0 }}
                      />
                    ) : (
                      <MotionDarkMode
                        initial={{ rotate: 45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 45, opacity: 0 }}
                      />
                    )}
                  </NoSsr>
                </AnimatePresence>
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
                <AnimatePresence initial={false}>
                  {dropdownOpen ? (
                    <MotionClose
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                    />
                  ) : (
                    <MotionMenu
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </IconButton>
            </Stack>
          </Stack>
          <AnimatePresence>
            {dropdownOpen && (
              <ClickAwayListener
                onClickAway={(event) => {
                  if (
                    !menuButtonRef.current?.contains(
                      event.target as HTMLElement
                    )
                  ) {
                    setDropdownOpen(false);
                  }
                }}
              >
                <MotionNavList
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  sx={{
                    display: { sm: "none" },
                    mx: -1.5,
                    overflowY: "hidden",
                  }}
                  onNavLinkClick={() => setDropdownOpen(false)}
                />
              </ClickAwayListener>
            )}
          </AnimatePresence>
        </LazyMotion>
      </Container>
    </Box>
  );
};

export default Header;
