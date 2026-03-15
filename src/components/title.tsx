"use client";

import {
  Title as MantineTitle,
  type TitleProps as MantineTitleProps,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { firstName, lastName } from "@/config";

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
