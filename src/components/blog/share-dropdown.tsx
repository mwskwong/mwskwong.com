'use client';

import {
  SiFacebook,
  SiHatenabookmark,
  SiLinkedin,
  SiReddit,
  SiX,
} from '@icons-pack/react-simple-icons';
import {
  Dropdown,
  type DropdownProps,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy';
import { Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';

import { firstName, lastName } from '@/constants/content';
import { env } from '@/env.mjs';

export interface ShareDropdownProps extends Omit<DropdownProps, 'children'> {
  blog: {
    id: string;
    categories?: string[];
    title: string;
  };
}

export const ShareDropdown: FC<ShareDropdownProps> = ({ blog, ...props }) => {
  const pathname = usePathname();
  const url = env.NEXT_PUBLIC_SITE_URL + pathname;
  const text = `"${blog.title}" by ${firstName} ${lastName}`;
  const socialMediaOptions = [
    {
      Icon: SiX,
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${blog.categories?.map((category) => category.replace(' ', '')).join(',') ?? ''}`,
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
    {
      Icon: SiHatenabookmark,
      name: 'Hatena',
      url: `http://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${blog.title}`,
    },
  ];

  return (
    <Dropdown {...props}>
      <MenuButton
        slotProps={{ root: { 'aria-label': 'Share this blog' } }}
        slots={{ root: IconButton }}
      >
        <Share2 />
      </MenuButton>
      <Menu>
        {socialMediaOptions.map(({ Icon, name, url }) => (
          <MenuItem key={name} component="a" href={url} target="_blank">
            <ListItemDecorator>
              <Icon viewBox="-2 -2 28 28" />
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
  );
};
