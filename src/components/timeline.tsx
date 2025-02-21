import { Badge } from "@radix-ui/themes/components/badge";
import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Grid, type GridProps } from "@radix-ui/themes/components/grid";
import {
  Heading,
  type HeadingProps,
} from "@radix-ui/themes/components/heading";
import { Link } from "@radix-ui/themes/components/link";
import { Text } from "@radix-ui/themes/components/text";
import Image, { type StaticImageData } from "next/image";
import { type FC } from "react";

import styles from "./timeline.module.css";

export type RootProps = FlexProps;
export const Root: FC<RootProps> = (props) => (
  <Flex direction="column" gap="8" width="100%" {...props} />
);

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

export interface ItemProps extends Omit<GridProps, "children"> {
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

export const Item: FC<ItemProps> = ({
  from = new Date(),
  to,
  title,
  organization,
  descriptions = [],
  media = [],
  tags = [],
  titleAs = "h3",
  ...props
}) => {
  const duration = to
    ? dateFormatter.formatRange(from, to)
    : `${dateFormatter.format(from)} – Present`;

  return (
    <Grid columns={{ sm: "4" }} gap={{ sm: "4" }} {...props}>
      <Text as="div" className={styles.duration} color="gray" size="2">
        {duration}
      </Text>
      <Flex direction="column" gap="4" gridColumn={{ sm: "span 3" }}>
        <Flex align="start" direction="column" gap="2">
          <Heading as={titleAs} size="4">
            {title}
          </Heading>
          <Link href={organization?.url} rel="noreferrer" target="_blank">
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
                  rel="noreferrer"
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
                  <a href={url} rel="noreferrer" target="_blank">
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
