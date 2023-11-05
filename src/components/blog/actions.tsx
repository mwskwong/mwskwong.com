'use client';

import {
  SiFacebook,
  SiLinkedin,
  SiReddit,
  SiX,
} from '@icons-pack/react-simple-icons';
import {
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  StackProps,
  Typography,
} from '@mui/joy';
import { Check, Copy, Eye, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { viewBlogById } from '@/app/actions';
import { baseUrl } from '@/constants/base-url';
import { firstName, lastName } from '@/constants/content';

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export interface ActionsProps extends StackProps {
  blog: {
    id: string;
    updatedAt: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    coverPhoto?: string;
    categories?: string[];
    title: string;
    slug: string;
    description: string;
    content?: string;
  };
  view?: number;
}

export const Actions: FC<ActionsProps> = ({ blog, view = 0, ...props }) => {
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
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-around"
      spacing={1}
      {...props}
    >
      <Typography mr={1} startDecorator={<Eye />}>
        {numberFormatter.format(view)} views
      </Typography>
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
    </Stack>
  );
};
