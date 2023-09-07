import {
  Card,
  CardContent,
  CardProps,
  Chip,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { StaticImageData } from 'next/image';
import NextLink from 'next/link';
import { FC } from 'react';

import { BlogCardImage, BlogCardImageProps } from './blog-card-image';

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
  updatedAt?: Date;
  slotProps?: CardProps['slotProps'] & {
    image?: Partial<BlogCardImageProps>;
  };
}

export const BlogCard: FC<BlogCardProps> = ({
  coverImgSrc,
  categories = [],
  title,
  description,
  href = '',
  updatedAt,
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
    <CardContent sx={{ flex: 1 }}>
      <Link
        color="neutral"
        component={NextLink}
        href={href}
        level="title-lg"
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
    <Typography level="body-xs">{dateFormatter.format(updatedAt)}</Typography>
  </Card>
);
