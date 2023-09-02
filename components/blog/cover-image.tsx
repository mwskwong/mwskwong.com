"use client";

import AspectRatio from "@mui/joy/AspectRatio";
import { useTheme } from "@mui/joy/styles";
import mergeSx from "merge-sx";
import { ComponentProps, FC } from "react";
import { SetOptional } from "type-fest";

import Image from "../image";

const CoverImage: FC<SetOptional<ComponentProps<typeof Image>, "alt">> = ({
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <AspectRatio
      ratio="1200/630"
      variant="outlined"
      objectFit="cover"
      sx={{ borderRadius: "md" }}
    >
      <Image
        role="presentation"
        alt=""
        fill
        sizes={[
          `${theme.breakpoints.up("md")} ${theme.breakpoints.values.md}px`,
          "100vw",
        ]
          .join(",")
          .replaceAll("@media ", "")}
        priority
        sx={mergeSx({ width: "100%", height: "auto" }, sx)}
        {...props}
      />
    </AspectRatio>
  );
};

export default CoverImage;
