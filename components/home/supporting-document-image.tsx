"use client";

import mergeSx from "merge-sx";
import { ComponentProps, FC } from "react";
import { SetOptional } from "type-fest";

import Image from "@/components/image";
import { thumIoPdfLoader } from "@/utils/image-loaders";

const SupportingDocumentImage: FC<
  SetOptional<ComponentProps<typeof Image>, "alt">
> = ({ sx, ...props }) => (
  <Image
    loader={thumIoPdfLoader}
    alt=""
    width={80}
    height={56}
    sx={mergeSx(
      {
        objectFit: "cover",
        objectPosition: "top",
        flexShrink: 0,
        borderRadius: "var(--unstable_List-childRadius)",
        border: 1,
        borderColor: "neutral.outlinedBorder",
      },
      sx,
    )}
    {...props}
  />
);

export default SupportingDocumentImage;
