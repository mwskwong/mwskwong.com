import {
  Badge,
  Flex,
  type FlexProps,
  Grid,
  type GridProps,
  Heading,
  Link,
  Text,
} from '@radix-ui/themes';
import Image, { type StaticImageData } from 'next/image';
import { type FC } from 'react';

export type RootProps = FlexProps;
export const Root: FC<RootProps> = (props) => {
  return <Flex direction="column" gap="8" width="100%" {...props} />;
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

export interface ItemProps extends Omit<GridProps, 'children'> {
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
}
export const Item: FC<ItemProps> = ({
  from = new Date(),
  to,
  title,
  organization,
  descriptions = [],
  media = [],
  tags = [],
  ...props
}) => {
  const duration = to
    ? dateFormatter.formatRange(from, to)
    : `${dateFormatter.format(from)} – Present`;

  return (
    <Grid columns={{ sm: '4' }} gap={{ sm: '4' }} {...props}>
      <Text
        as="div"
        className="leading-[var(--heading-line-height-4)]"
        color="gray"
        size="2"
      >
        {duration}
      </Text>
      <Flex className="sm:col-span-3" direction="column" gap="4">
        <Flex align="start" direction="column" gap="2">
          <Heading as="h3" size="4">
            {title}
          </Heading>
          <Link href={organization?.url} rel="noopener" target="_blank">
            {organization?.name}
          </Link>
          <ul className="list-disc pl-[20px] [&>*:not(:first-child)]:pt-1 [&>*:not(:last-child)]:pb-1">
            {descriptions.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </ul>
        </Flex>
        <Flex gap="3">
          {media.map(({ name = '', url, thumbnail }) => (
            <Flex key={name} asChild align="center" gap="3">
              <Link
                highContrast
                color="gray"
                href={url}
                rel="noopener"
                target="_blank"
              >
                {thumbnail ? (
                  <Image
                    alt={name}
                    className="h-[revert-layer] rounded-4 border-[1px] border-accentA-8 object-cover"
                    height={56}
                    src={thumbnail}
                    width={80}
                  />
                ) : null}
                {name}
              </Link>
            </Flex>
          ))}
        </Flex>
        <Flex gap="3" wrap="wrap">
          {tags.map(({ name, url }) => (
            <Badge key={name} data-accent-color asChild={Boolean(url)} size="3">
              {url ? (
                <a href={url} rel="noopener" target="_blank">
                  {name}
                </a>
              ) : (
                name
              )}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Grid>
  );
};
