'use client';

import {
  ContentCopyRounded,
  DoneRounded,
  Facebook,
  FavoriteBorderRounded,
  FavoriteRounded,
  Reddit,
  ShareRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Stack, { StackProps } from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { incrBlogView, likeBlog, unlikeBlog } from '@/app/actions';
import { firstName, lastName } from '@/constants/content';
import { baseUrl } from '@/utils/base-url';

import { LinkedIn } from '../icons/linkedin';
import { X } from '../icons/x';

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export interface ActionsProps extends StackProps {
  blog: {
    id: string;
    createdAt: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    coverPhoto?: string;
    categories: string[];
    title: string;
    slug: string;
    description: string;
    content?: string;
  };
  view?: number;
  like?: number;
}

export const Actions: FC<ActionsProps> = ({
  blog,
  view = 0,
  like = 0,
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const [optimisticLike, setOptimisticLike] = useState(like);
  const [optimisticLiked, setOptimisticLiked] = useState(false);
  const pathname = usePathname();
  const url = `${baseUrl}${pathname}`;

  const socialMediaOptions = useMemo(
    () => [
      {
        Icon: X,
        name: 'X',
        url: `https://twitter.com/intent/tweet?text=${
          blog.title
        } by ${firstName} ${lastName}&url=${url}&hashtags=${blog.categories.join(
          ',',
        )}`,
      },
      {
        Icon: Facebook,
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      },
      {
        Icon: LinkedIn,
        name: 'LinkedIn',
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      },
      {
        Icon: Reddit,
        name: 'Reddit',
        url: `http://www.reddit.com/submit/?title=${blog.title}&url=${url}`,
      },
    ],
    [blog.categories, blog.title, url],
  );

  useEffect(() => void incrBlogView(blog.id), [blog.id]);

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-around"
      spacing={1}
      {...props}
    >
      <Stack alignItems="center" direction="row" spacing={1}>
        <VisibilityRounded />
        <Typography>{numberFormatter.format(view)}</Typography>
      </Stack>
      <Stack alignItems="center" component="form" direction="row">
        <IconButton
          aria-label={optimisticLiked ? 'unlike blog' : 'like blog'}
          color={optimisticLiked ? 'danger' : undefined}
          onClick={async () => {
            const prevLiked = optimisticLiked;
            // FIXME: make use of useOptimistic when official doc is available
            try {
              setOptimisticLike((prev) => prev + (prevLiked ? -1 : 1));
              setOptimisticLiked((prev) => !prev);
              await (prevLiked ? unlikeBlog(blog.id) : likeBlog(blog.id));
            } catch (error) {
              setOptimisticLike((prev) => prev + (prevLiked ? 1 : -1));
              setOptimisticLiked(prevLiked);
            }
          }}
        >
          {optimisticLiked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
        </IconButton>
        <Typography>{numberFormatter.format(optimisticLike)}</Typography>
      </Stack>
      <IconButton
        aria-label="copy blog url"
        color={copied ? 'success' : undefined}
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied ? <DoneRounded /> : <ContentCopyRounded />}
      </IconButton>
      <IconButton
        aria-label="Share this blog to social media"
        onClick={() =>
          navigator.share({
            url,
            text: `${blog.title} by ${firstName} ${lastName}`,
            title: blog.title,
          })
        }
        sx={{ display: { sm: 'none' }, ml: -0.5 }}
      >
        <ShareRounded />
      </IconButton>
      <Dropdown>
        <MenuButton
          aria-label="Share this blog to social media"
          slots={{ root: IconButton }}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <ShareRounded />
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
            onClick={() =>
              navigator.share({
                url,
                text: `${blog.title} by ${firstName} ${lastName}`,
                title: blog.title,
              })
            }
          >
            <ListItemDecorator />
            Share via ...
          </MenuItem>
        </Menu>
      </Dropdown>
    </Stack>
  );
};
