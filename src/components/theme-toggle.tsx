"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { Button, type ButtonProps } from "@heroui/react";
import { useTheme } from "next-themes";

export type ThemeToggleProps = Omit<ButtonProps, "children">;
export const ThemeToggle = ({
  isDisabled,
  onClick,
  ...props
}: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      aria-label="toggle theme"
      isDisabled={!resolvedTheme && isDisabled}
      isIconOnly
      variant="ghost"
      onClick={(event) => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        onClick?.(event);
      }}
      {...props}
    >
      <Sun className="block dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
};
