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
import { type FC } from 'react';

export type RootProps = FlexProps;
export const Root: FC<RootProps> = (props) => {
  return <Flex direction="column" gap="8" {...props} />;
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
  // projects?: {
  //   name?: string;
  //   url?: string;
  //   thumbnail?: string | StaticImageData;
  // }[];
  // supportingDocuments?: {
  //   title?: string;
  //   url?: string;
  // }[];
  tags?: { name: string; url?: string }[];
}
export const Item: FC<ItemProps> = ({
  from = new Date(),
  to,
  title,
  organization,
  descriptions = [],
  tags = [],
  ...props
}) => {
  const duration = to
    ? dateFormatter.formatRange(from, to)
    : `${dateFormatter.format(from)} – Present`;

  return (
    <Grid columns={{ sm: '8' }} gap={{ sm: '4' }} {...props}>
      <Text
        as="div"
        className="leading-[var(--heading-line-height-4)] sm:col-span-2"
        color="gray"
        size="2"
      >
        {duration}
      </Text>
      <Flex className="sm:col-span-6" direction="column" gap="2">
        <Heading as="h3" size="4">
          {title}
        </Heading>
        <Link href={organization?.url}>{organization?.name}</Link>
        <ul className="list-disc pl-[20px] [&>*]:py-1">
          {descriptions.map((description) => (
            <li key={description}>{description}</li>
          ))}
        </ul>
        <Flex gap="3" mt="2" wrap="wrap">
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
