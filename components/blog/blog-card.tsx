import Card, { CardProps } from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { StaticImageData } from "next/image";
import NextLink from "next/link";
import { ComponentProps, FC } from "react";

import BlogCardImage from "./blog-card-image";

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface Props extends Omit<CardProps, "children"> {
  coverImgSrc: string | StaticImageData;
  categories?: string[];
  title?: string;
  description?: string;
  href?: string;
  updatedAt?: Date;
  slotProps?: CardProps["slotProps"] & {
    image?: Partial<ComponentProps<typeof BlogCardImage>>;
  };
}

const BlogCard: FC<Props> = ({
  coverImgSrc,
  categories = [],
  title,
  description,
  href = "",
  updatedAt,
  slotProps: { image: imageSlotProps, ...slotProps } = {},
  ...props
}) => (
  <Card component="article" slotProps={slotProps} {...props}>
    <BlogCardImage src={coverImgSrc} {...imageSlotProps} />
    <Stack direction="row" spacing={1}>
      {categories.map((category) => (
        <Chip key={category} color="primary" size="sm">
          {category}
        </Chip>
      ))}
    </Stack>
    <CardContent>
      <Link
        component={NextLink}
        href={href}
        color="neutral"
        textColor="text.primary"
        level="title-lg"
        overlay
      >
        {title}
      </Link>
      <Typography
        overflow="hidden"
        display="-webkit-box"
        sx={{ WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
      >
        {description}
      </Typography>
    </CardContent>
    <Typography level="body-xs">{dateFormatter.format(updatedAt)}</Typography>
  </Card>
);

export default BlogCard;
