"use client";

import {
  ActionIcon,
  type ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import styles from "./color-scheme-toggle.module.css";

export const ColorSchemeToggle = (props: ActionIconProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();

  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      variant="default"
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      {...props}
    >
      <IconSun className={styles.light} size={18} />
      <IconMoon className={styles.dark} size={18} />
    </ActionIcon>
  );
};
