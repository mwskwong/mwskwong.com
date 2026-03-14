"use client";

import {
  ActionIcon,
  type ActionIconProps,
  type PolymorphicComponentProps,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import styles from "./color-scheme-toggle.module.css";

export type ColorSchemeToggleProps = Omit<
  PolymorphicComponentProps<"button", ActionIconProps>,
  "children"
>;
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
      <IconSun className={styles.light} size={18} />
      <IconMoon className={styles.dark} size={18} />
    </ActionIcon>
  );
};
