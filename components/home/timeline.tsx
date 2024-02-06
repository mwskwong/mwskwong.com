import {
  Chip,
  Grid,
  GridProps,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemProps,
  Stack,
  Typography,
} from '@mui/joy';
import { mergeSx } from 'merge-sx';
import { StaticImageData } from 'next/image';
import { FC, Fragment, forwardRef } from 'react';

import { Image, ImageProps } from '../image';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

type ListItemWithThumbnailProps = ListItemProps & {
  href?: string;
  thumbnailSrc?: string | StaticImageData;
  slotProps?: {
    thumbnail?: Partial<ImageProps>;
  };
};

const ListItemWithThumbnail: FC<ListItemWithThumbnailProps> = ({
  href,
  thumbnailSrc,
  children,
  sx,
  slotProps,
  ...props
}) => {
  const { thumbnail, ...listItemSlotProps } = slotProps ?? {};
  const { sx: thumbnailSx, ...thumbnailProps } = thumbnail ?? {};
  return (
    <ListItem
      slotProps={listItemSlotProps}
      sx={mergeSx(
        {
          minWidth: { sm: 250 },
          width: { xs: '100%', sm: 'auto' },
          maxWidth: '100%',
          '&:not(:only-child)': { maxWidth: { sm: 400 } },
        },
        sx,
      )}
      {...props}
    >
      <ListItemButton component="a" href={href} sx={{ gap: 2 }} target="_blank">
        {thumbnailSrc ? (
          <Image
            alt={`Thumbnail for ${children?.toString()}`}
            height={56}
            src={thumbnailSrc}
            sx={mergeSx(
              {
                flexShrink: 0,
                borderRadius: 'var(--ListItem-radius)',
                border: 1,
                borderColor: 'neutral.outlinedBorder',
                ml: 'calc(var(--ListItem-paddingX) * -1)',
              },
              thumbnailSx,
            )}
            width={80}
            {...thumbnailProps}
          />
        ) : null}
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export interface TimelineItemProps extends Omit<GridProps, 'children'> {
  from?: Date;
  to?: Date;
  title?: string;
  organizations?: {
    name?: string;
    url?: string;
  }[];
  organizationsRelationship?: string;
  descriptions?: string[];
  projects?: {
    name?: string;
    url?: string;
    thumbnail?: string | StaticImageData;
  }[];
  supportingDocuments?: {
    title?: string;
    url?: string;
  }[];
  tags?: { label: string; url?: string }[];
}

export const TimelineItem: FC<TimelineItemProps> = forwardRef(
  (
    {
      from = new Date(),
      to,
      title,
      organizations = [],
      organizationsRelationship,
      descriptions = [],
      projects = [],
      supportingDocuments = [],
      tags = [],
      ...props
    },
    ref,
  ) => {
    const duration = to
      ? dateFormatter.formatRange(from, to)
      : `${dateFormatter.format(from)} - Present`;

    return (
      <Grid
        columnSpacing={2}
        container
        ref={ref}
        rowSpacing={0}
        xs={12}
        {...props}
      >
        <Grid sm={3} xs={12}>
          <Typography level="body-sm" mb={1} mt="2px">
            {duration}
          </Typography>
        </Grid>
        <Grid sm xs={12}>
          <Typography level="title-lg">{title}</Typography>
          <Stack spacing={1}>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={1}
            >
              <Typography>
                {organizations.map(({ name, url }, index) => (
                  <Fragment key={name}>
                    {index !== 0 && ' · '}
                    <Link href={url} target="_blank">
                      {name}
                    </Link>
                  </Fragment>
                ))}
              </Typography>
              {organizationsRelationship ? (
                <Chip color="warning" size="sm" variant="outlined">
                  {organizationsRelationship}
                </Chip>
              ) : null}
            </Stack>
            {descriptions.length > 0 && (
              <List
                sx={{ '--List-padding': '0px', '--ListItem-paddingX': '0px' }}
              >
                {descriptions.map((description) => (
                  <ListItem key={description}>{description}</ListItem>
                ))}
              </List>
            )}
            {(projects.length > 0 || supportingDocuments.length > 0) && (
              <List
                orientation="horizontal"
                sx={{
                  '--List-radius': 'var(--joy-radius-sm)',
                  '--List-padding': '0px',
                  flexWrap: 'wrap',
                }}
              >
                {projects.map(({ name, thumbnail, url }) => (
                  <ListItemWithThumbnail
                    href={url}
                    key={name}
                    thumbnailSrc={thumbnail}
                  >
                    {name}
                  </ListItemWithThumbnail>
                ))}
                {supportingDocuments.map(({ title, url }) => (
                  <ListItemWithThumbnail
                    href={url}
                    key={title}
                    slotProps={{ thumbnail: { sx: { objectPosition: 'top' } } }}
                    // to support for 4x dpi
                    thumbnailSrc={`https://image.thum.io/get/pdfSource/width/${80 * 4}/${url}`}
                  >
                    {title}
                  </ListItemWithThumbnail>
                ))}
              </List>
            )}
            {tags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {tags.map(({ label, url }) => (
                  <Chip
                    key={label}
                    slotProps={{
                      action: url
                        ? { component: 'a', href: url, target: '_blank' }
                        : undefined,
                    }}
                  >
                    {label}
                  </Chip>
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  },
);

TimelineItem.displayName = 'TimelineItem';
// @ts-expect-error MUI specific checking
TimelineItem.muiName = 'Grid';

export type TimelineProps = GridProps;
export const Timeline: FC<TimelineProps> = ({ children, ...props }) => (
  <Grid container disableEqualOverflow spacing={6} {...props}>
    {children}
  </Grid>
);
