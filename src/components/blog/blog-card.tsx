import { FavoriteRounded, VisibilityRounded } from '@mui/icons-material';
import Card, { CardProps } from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { StaticImageData } from 'next/image';
import NextLink from 'next/link';
import { FC } from 'react';

import { BlogCardImage, BlogCardImageProps } from './blog-card-image';

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export interface BlogCardProps extends Omit<CardProps, 'children'> {
  coverImgSrc: string | StaticImageData;
  categories?: string[];
  title?: string;
  description?: string;
  href?: string;
  date?: Date;
  slotProps?: CardProps['slotProps'] & {
    image?: Partial<BlogCardImageProps>;
  };
  view?: number;
  like?: number;
}

export const BlogCard: FC<BlogCardProps> = ({
  coverImgSrc,
  categories = [],
  title,
  description,
  href = '',
  date,
  view = 0,
  like = 0,
  slotProps: { image: imageSlotProps, ...slotProps } = {},
  ...props
}) => (
  <Card component="article" slotProps={slotProps} {...props}>
    <BlogCardImage src={coverImgSrc} {...imageSlotProps} />
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {categories.map((category) => (
        <Chip color="primary" key={category} size="sm">
          {category}
        </Chip>
      ))}
    </Stack>
    <CardContent>
      <Link
        color="neutral"
        component={NextLink}
        display="-webkit-box"
        href={href}
        level="title-lg"
        overflow="hidden"
        overlay
        sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        textColor="text.primary"
      >
        {title}
      </Link>
      <Typography
        display="-webkit-box"
        overflow="hidden"
        sx={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
      >
        {description}
      </Typography>
    </CardContent>
    <CardContent orientation="horizontal" sx={{ flex: 0 }}>
      <Typography level="body-xs">{dateFormatter.format(date)}</Typography>
      <Divider orientation="vertical" />
      <Stack direction="row" spacing={0.5}>
        <VisibilityRounded fontSize="lg" />
        <Typography level="body-xs">{numberFormatter.format(view)}</Typography>
      </Stack>
      <Divider orientation="vertical" />
      <Stack direction="row" spacing={0.5}>
        <FavoriteRounded fontSize="lg" />
        <Typography level="body-xs">{numberFormatter.format(like)}</Typography>
      </Stack>
    </CardContent>
  </Card>
);
