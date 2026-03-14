"use client";

import {
  ActionIcon,
  type ActionIconProps,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

import styles from "./color-scheme-toggle.module.css";

export const ColorSchemeToggle = (props: ActionIconProps) => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      variant="default"
      onClick={toggleColorScheme}
      {...props}
    >
      <IconSun className={styles.light} size={18} />
      <IconMoonStars className={styles.dark} size={18} />
    </ActionIcon>
  );
};
