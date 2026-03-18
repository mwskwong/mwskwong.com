"use client";

import {
  ActionIcon,
  type ActionIconProps,
  type ElementProps,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import styles from "./color-scheme-toggle.module.css";

export type ColorSchemeToggleProps = ActionIconProps &
  ElementProps<"button", keyof ActionIconProps | "children">;
export const ColorSchemeToggle = ({
  onClick,
  ...props
}: ColorSchemeToggleProps) => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      color="dark"
      variant="subtle"
      onClick={(event) => {
        toggleColorScheme();
        onClick?.(event);
      }}
      {...props}
    >
      <IconSun className={styles.iconLight} size={18} />
      <IconMoon className={styles.iconDark} size={18} />
    </ActionIcon>
  );
};
