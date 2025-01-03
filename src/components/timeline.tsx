import {
  Badge,
  Box,
  Card,
  Flex,
  type FlexProps,
  Grid,
  type GridProps,
  Heading,
  type HeadingProps,
  Link,
  Text,
} from "@radix-ui/themes";
import Image, { type StaticImageData } from "next/image";
import { type FC } from "react";

import styles from "./timeline.module.css";

export type RootProps = FlexProps;
export const Root: FC<RootProps> = (properties) => {
  return <Flex direction="column" gap="8" width="100%" {...properties} />;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

export interface ItemProperties extends Omit<GridProps, "children"> {
  from?: Date;
  to?: Date;
  title?: string;
  organization?: {
    name?: string;
    url?: string;
  };
  descriptions?: string[];
  media?: {
    name?: string;
    url?: string;
    thumbnail?: string | StaticImageData;
  }[];
  tags?: { name: string; url?: string }[];
  titleAs?: HeadingProps["as"];
}

export const Item: FC<ItemProperties> = ({
  from = new Date(),
  to,
  title,
  organization,
  descriptions = [],
  media = [],
  tags = [],
  titleAs = "h3",
  ...properties
}) => {
  const duration = to
    ? dateFormatter.formatRange(from, to)
    : `${dateFormatter.format(from)} – Present`;

  return (
    <Grid columns={{ sm: "4" }} gap={{ sm: "4" }} {...properties}>
      <Text as="div" className={styles.duration} color="gray" size="2">
        {duration}
      </Text>
      <Flex direction="column" gap="4" gridColumn={{ sm: "span 3" }}>
        <Flex align="start" direction="column" gap="2">
          <Heading as={titleAs} size="4">
            {title}
          </Heading>
          <Link href={organization?.url} rel="noopener" target="_blank">
            {organization?.name}
          </Link>
          {descriptions.length > 0 && (
            <Box asChild className={styles.description} pl="20px">
              <ul>
                {descriptions.map((description) => (
                  <li key={description}>{description}</li>
                ))}
              </ul>
            </Box>
          )}
        </Flex>
        {media.length > 0 && (
          <Flex gap="3" wrap="wrap">
            {media.map(({ name = "", url, thumbnail }) => (
              <Card key={name} asChild variant="ghost">
                <a
                  aria-label={name}
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {thumbnail ? (
                    <Image
                      alt={name}
                      className={styles.mediaImage}
                      height={9 * 12}
                      src={thumbnail}
                      width={16 * 12}
                    />
                  ) : undefined}
                </a>
              </Card>
            ))}
          </Flex>
        )}
        {tags.length > 0 && (
          <Flex gap="3" wrap="wrap">
            {tags.map(({ name, url }) => (
              <Badge key={name} asChild={Boolean(url)} size="3">
                {url ? (
                  <a href={url} rel="noopener noreferrer" target="_blank">
                    {name}
                  </a>
                ) : (
                  name
                )}
              </Badge>
            ))}
          </Flex>
        )}
      </Flex>
    </Grid>
  );
};
