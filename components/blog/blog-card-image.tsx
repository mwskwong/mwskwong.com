"use client";

import AspectRatio from "@mui/joy/AspectRatio";
import { useTheme } from "@mui/joy/styles";
import mergeSx from "merge-sx";
import { ComponentProps, FC } from "react";
import { SetOptional } from "type-fest";

import Image from "../image";

const BlogCardImage: FC<SetOptional<ComponentProps<typeof Image>, "alt">> = ({
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <AspectRatio ratio="1200/630" variant="outlined" objectFit="cover">
      <Image
        role="presentation"
        alt=""
        fill
        sizes={[
          `${theme.breakpoints.up("lg")} ${
            theme.breakpoints.values.lg / (12 / 4)
          }px`,
          `${theme.breakpoints.up("md")} ${Math.round((4 / 12) * 100)}vw`,
          `${theme.breakpoints.up("sm")} ${Math.round((6 / 12) * 100)}vw`,
          "100vw",
        ]
          .join(",")
          .replaceAll("@media ", "")}
        sx={mergeSx({ width: "100%", height: "auto", objectFit: "cover" }, sx)}
        {...props}
      />
    </AspectRatio>
  );
};

export default BlogCardImage;
