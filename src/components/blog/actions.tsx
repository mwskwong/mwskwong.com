'use client';

import {
  SiFacebook,
  SiLinkedin,
  SiReddit,
  SiX,
} from '@icons-pack/react-simple-icons';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Check, Copy, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { baseUrl } from '@/constants/base-url';
import { firstName, lastName } from '@/constants/content';
import { viewBlogById } from '@/lib/actions';

export interface ActionsProps {
  blog: {
    id: string;
    categories?: string[];
    title: string;
  };
}

export const Actions: FC<ActionsProps> = ({ blog }) => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const url = `${baseUrl}${pathname}`;
  const text = `"${blog.title}" by ${firstName} ${lastName}`;

  const socialMediaOptions = useMemo(
    () => [
      {
        Icon: SiX,
        name: 'X',
        url: `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${blog.categories
          ?.map((category) => category.replace(' ', ''))
          .join(',')}`,
      },
      {
        Icon: SiFacebook,
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      },
      {
        Icon: SiLinkedin,
        name: 'LinkedIn',
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      },
      {
        Icon: SiReddit,
        name: 'Reddit',
        url: `http://www.reddit.com/submit/?url=${url}&title=${blog.title}`,
      },
    ],
    [blog.categories, blog.title, text, url],
  );

  useEffect(() => void viewBlogById(blog.id), [blog.id]);

  return (
    <>
      <IconButton
        aria-label="copy blog url"
        color={copied ? 'success' : undefined}
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied ? <Check /> : <Copy />}
      </IconButton>
      <Dropdown>
        <MenuButton
          aria-label="Share this blog to social media"
          slots={{ root: IconButton }}
        >
          <Share2 />
        </MenuButton>
        <Menu>
          {socialMediaOptions.map(({ Icon, name, url }) => (
            <MenuItem component="a" href={url} key={name} target="_blank">
              <ListItemDecorator>
                <Icon />
              </ListItemDecorator>
              Share on {name}
            </MenuItem>
          ))}
          <ListDivider />
          <MenuItem
            onClick={() => navigator.share({ url, text, title: blog.title })}
          >
            <ListItemDecorator />
            Share via...
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};
