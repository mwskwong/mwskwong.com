import {
  Badge,
  Card,
  Flex,
  type FlexProps,
  Grid,
  type GridProps,
  Heading,
  Inset,
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
          {descriptions.length > 0 && (
            <ul className="list-disc pl-[20px] [&>*:not(:first-child)]:pt-1 [&>*:not(:last-child)]:pb-1">
              {descriptions.map((description) => (
                <li key={description}>{description}</li>
              ))}
            </ul>
          )}
        </Flex>
        {media.length > 0 && (
          <Flex gap="3">
            {media.map(({ name = '', url, thumbnail }) => (
              <Card key={name} asChild>
                <a aria-label={name} href={url} rel="noopener" target="_blank">
                  <Inset>
                    {thumbnail ? (
                      <Image
                        alt={name}
                        className="object-cover"
                        height={9 * 12}
                        src={thumbnail}
                        width={16 * 12}
                      />
                    ) : null}
                  </Inset>
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
                  <a href={url} rel="noopener" target="_blank">
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
