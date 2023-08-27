"use client";

import Card, { CardProps } from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useTheme } from "@mui/joy/styles";
import { StaticImageData } from "next/image";
import NextLink from "next/link";
import { FC } from "react";

import Image from "@/components/image";

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
}

const BlogCard: FC<Props> = ({
  coverImgSrc,
  categories = [],
  title,
  description,
  href = "",
  updatedAt,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Card component="article" variant="outlined" {...props}>
      <Image
        src={coverImgSrc}
        alt=""
        // WORKAROUND: Next.js requires width and height to be specified for remote image
        // while with sizes specified, they are meaningless in this case meaningless
        width={0}
        height={0}
        sizes={[
          `${theme.breakpoints.up("md")} ${Math.round((4 / 12) * 100)}vw`,
          `${theme.breakpoints.up("sm")} ${Math.round((6 / 12) * 100)}vw`,
          "100vw",
        ].join(",")}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "md",
          border: 1,
          borderColor: "neutral.outlinedBorder",
          objectFit: "cover",
          aspectRatio: "1200/630",
        }}
      />

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
          color="neutral"
          textColor="text.primary"
          level="title-lg"
          overlay
          href={href}
        >
          {title}
        </Link>
        <Typography>{description}</Typography>
      </CardContent>
      <Typography level="body-xs">{dateFormatter.format(updatedAt)}</Typography>
    </Card>
  );
};

export default BlogCard;
