"use client";

import { LinkRounded, ShareRounded } from "@mui/icons-material";
import Dropdown, { DropdownProps } from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import ListDivider from "@mui/joy/ListDivider";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { FC, useMemo } from "react";

import { firstName, lastName } from "@/constants/content";

import Facebook from "../icons/facebook";
import LinkedIn from "../icons/linkedin";
import Reddit from "../icons/reddit";
import X from "../icons/x";

interface Props extends Omit<DropdownProps, "children"> {
  blog?: {
    updatedAt: Date;
    coverPhoto?: string;
    categories: string[];
    title: string;
    description: string;
    url: string;
  };
}

const ShareDropDown: FC<Props> = ({ blog, ...props }) => {
  const socialMediaOptions = useMemo(
    () => [
      {
        Icon: X,
        name: "X",
        url: `https://twitter.com/intent/tweet?text=${blog?.title} by ${firstName} ${lastName}&url=${blog?.url}&hashtags=${blog?.categories.join(
          ",",
        )}`,
      },
      {
        Icon: Facebook,
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${blog?.url}`,
      },
      {
        Icon: LinkedIn,
        name: "LinkedIn",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${blog?.url}`,
      },
      {
        Icon: Reddit,
        name: "Reddit",
        url: `http://www.reddit.com/submit/?title=${blog?.title}&url=${blog?.url}`,
      },
    ],
    [blog?.categories, blog?.title, blog?.url],
  );

  return (
    <Dropdown {...props}>
      <MenuButton slots={{ root: IconButton }}>
        <ShareRounded />
      </MenuButton>
      <Menu placement="bottom-end">
        {/* TODO: prompt Snackbar when success */}
        <MenuItem
          onClick={() => blog && navigator.clipboard.writeText(blog.url)}
        >
          <ListItemDecorator>
            <LinkRounded />
          </ListItemDecorator>
          Copy link
        </MenuItem>
        <ListDivider />
        {socialMediaOptions.map(({ Icon, name, url }) => (
          <MenuItem
            key={name}
            onClick={() =>
              window.open(
                encodeURI(url),
                undefined,
                [
                  "popup=true",
                  "width=650",
                  "height=700",
                  `left=${(window.screen.width - 650) / 2}`,
                  `top=${(window.screen.height - 700) / 2}`,
                ].join(","),
              )
            }
          >
            <ListItemDecorator>
              <Icon />
            </ListItemDecorator>
            Share on {name}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default ShareDropDown;
