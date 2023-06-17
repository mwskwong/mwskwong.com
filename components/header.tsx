"use client";

import { ClickAwayListener, NoSsr } from "@mui/base";
import {
  CloseRounded,
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
} from "@mui/icons-material";
import {
  Container,
  IconButton,
  Sheet,
  SheetProps,
  Stack,
  useColorScheme,
} from "@mui/joy";
import { mergeSx } from "merge-sx";
import Link from "next/link";
import { FC, useRef, useState } from "react";

import { getPlatformProfiles } from "@/api";
import { home } from "@/constants/nav";
import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

import Icon from "./icon";
import NavList from "./nav-list";

interface Props extends Omit<SheetProps<"header">, "children"> {
  platformProfiles?: Awaited<ReturnType<typeof getPlatformProfiles>>;
}

const Header: FC<Props> = ({ platformProfiles = [], sx, ...props }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mode, setMode } = useColorScheme();
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
          zIndex: 1100, // TODO: is there a built-in way to do this in the future?
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
            <NavList sx={{ display: { sm: "none" }, mx: -1.5 }} />
          </ClickAwayListener>
        )}
      </Container>
    </Sheet>
  );
};

export default Header;
