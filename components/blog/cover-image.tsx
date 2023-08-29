"use client";

import { useTheme } from "@mui/joy/styles";
import { mergeSx } from "merge-sx";
import { ComponentProps, FC } from "react";
import { SetOptional } from "type-fest";

import Image from "../image";

const CoverImage: FC<SetOptional<ComponentProps<typeof Image>, "alt">> = ({
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
        `${theme.breakpoints.up("md")} ${theme.breakpoints.values.md}px`,
        "100vw",
      ].join(",")}
      priority
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

export default CoverImage;
