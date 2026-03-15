"use client";

import {
  ActionIcon,
  type ActionIconProps,
  type ElementProps,
  Title as MantineTitle,
  type TitleProps as MantineTitleProps,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { firstName, lastName } from "@/config";

import styles from "./client-components.module.css";

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
      <IconSun className={styles.colorSchemeToggleIconLight} size={18} />
      <IconMoon className={styles.colorSchemeToggleIconDark} size={18} />
    </ActionIcon>
  );
};

export type TitleProps = Omit<MantineTitleProps, "children">;
export const Title = (props: TitleProps) => {
  const { primaryColor } = useMantineTheme();

  return (
    <MantineTitle {...props}>
      <Text c={primaryColor} inherit span>
        {firstName}
      </Text>{" "}
      {lastName}
    </MantineTitle>
  );
};
