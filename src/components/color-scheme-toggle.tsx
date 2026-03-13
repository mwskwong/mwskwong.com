"use client";

import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import styles from "./color-scheme-toggle.module.css";

export const ColorSchemeToggle = (props: ActionIconProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();

  return (
    <ActionIcon
      variant="default"
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      {...props}
    >
      <IconSun size={18} className={styles.light} />
      <IconMoon size={18} className={styles.dark} />
    </ActionIcon>
  );
};
