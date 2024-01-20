import {
  Chip,
  Grid,
  GridProps,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Stack,
  Typography,
} from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { StaticImageData } from 'next/image';
import { FC, Fragment, forwardRef } from 'react';

import { Image } from '../image';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

const listItemImageSize = { width: 80, height: 56 };
const listItemImageSx = {
  flexShrink: 0,
  borderRadius: 'var(--ListItem-radius)',
  border: 1,
  borderColor: 'neutral.outlinedBorder',
} satisfies SxProps;

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
  tags?: string[];
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
                  '--ListItemDecorator-size': `calc(${listItemImageSize.width}px + var(--ListItem-paddingX))`,
                  flexWrap: 'wrap',
                  '& > li': {
                    minWidth: { sm: 250 },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: '100%',
                    '&:not(:only-child)': { maxWidth: { sm: 400 } },
                    '& .MuiListItemDecorator-root': {
                      ml: 'calc(var(--ListItem-paddingX) * -1)',
                    },
                  },
                }}
              >
                {projects.map(({ name, thumbnail = '', url }) => (
                  <ListItem key={title}>
                    <ListItemButton component="a" href={url} target="_blank">
                      <ListItemDecorator>
                        <Image
                          alt={`Thumbnail for ${name}`}
                          src={thumbnail}
                          {...listItemImageSize}
                          sx={listItemImageSx}
                        />
                      </ListItemDecorator>
                      {name}
                    </ListItemButton>
                  </ListItem>
                ))}
                {supportingDocuments.map(({ title, url = '' }) => (
                  <ListItem key={title}>
                    <ListItemButton component="a" href={url} target="_blank">
                      <ListItemDecorator>
                        <Image
                          alt={`Thumbnail for ${title}`}
                          // to support for 4x dpi
                          src={`https://image.thum.io/get/pdfSource/width/${listItemImageSize.width * 4}/${url}`}
                          {...listItemImageSize}
                          sx={[listItemImageSx, { objectPosition: 'top' }]}
                        />
                      </ListItemDecorator>
                      {title}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
            {tags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {tags.map((tag) => (
                  <Chip color="primary" key={tag}>
                    {tag}
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
