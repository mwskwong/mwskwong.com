"use client";

import { ShareRounded } from "@mui/icons-material";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { FC } from "react";

import { firstName, lastName } from "@/constants/content";

interface Props extends Omit<IconButtonProps, "children"> {
  blog?: {
    id: string;
    updatedAt: Date;
    coverPhoto?: string;
    categories: string[];
    title: string;
    description: string;
    url: string;
  };
}

const ShareButton: FC<Omit<Props, "children">> = ({ blog, ...props }) => (
  <IconButton
    onClick={() =>
      navigator.share({
        url: blog?.url,
        text: `${blog?.title} by ${firstName} ${lastName}`,
        title: blog?.title,
      })
    }
    {...props}
  >
    <ShareRounded />
  </IconButton>
);

export default ShareButton;
