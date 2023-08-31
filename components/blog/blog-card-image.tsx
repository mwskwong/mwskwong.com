"use client";

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
    <Image
      role="presentation"
      alt=""
      // WORKAROUND: Next.js requires width and height to be specified for remote image
      // while with sizes specified, they are meaningless in this case meaningless
      width={0}
      height={0}
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
      sx={mergeSx(
        {
          width: "100%",
          height: "auto",
          borderRadius: "md",
          border: 1,
          borderColor: "neutral.outlinedBorder",
          objectFit: "cover",
          aspectRatio: "1200/630",
        },
        sx,
      )}
      {...props}
    />
  );
};

export default BlogCardImage;
