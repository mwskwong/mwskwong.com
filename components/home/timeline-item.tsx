import Chip from "@mui/joy/Chip";
import Grid, { GridProps } from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC, Fragment, forwardRef } from "react";

import SupportingDocumentImage from "./supporting-document-image";

interface Props extends Omit<GridProps, "children"> {
  from?: Date;
  to?: Date;
  title?: string;
  organizations?: {
    name?: string;
    url?: string;
  }[];
  organizationsRelationship?: string;
  descriptions?: string[];
  supportingDocuments?: {
    title: string;
    url: string;
  }[];
  tags?: string[];
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const TimelineItem: FC<Props> = forwardRef(
  (
    {
      from = new Date(),
      to,
      title,
      organizations = [],
      organizationsRelationship,
      descriptions = [],
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
        // WORKAROUND: nested grid doesn't work when the parent is an RSC, manually assigning the level
        unstable_level={1}
        ref={ref}
        container
        rowSpacing={0}
        columnSpacing={2}
        xs={12}
        {...props}
      >
        {/* WORKAROUND: nested grid doesn't work when the parent is an RSC, manually assigning the level */}
        <Grid unstable_level={2} xs={12} sm={3}>
          <Typography level="body-xs" textTransform="uppercase" mt="2px" mb={1}>
            {duration}
          </Typography>
        </Grid>
        {/* WORKAROUND: nested grid doesn't work when the parent is an RSC, manually assigning the level */}
        <Grid unstable_level={2} xs={12} sm>
          <Typography level="title-md">{title}</Typography>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Typography>
                {organizations.map(({ name, url }, index) => (
                  <Fragment key={name}>
                    {index !== 0 && " · "}
                    <Link href={url} target="_blank">
                      {name}
                    </Link>
                  </Fragment>
                ))}
              </Typography>
              {organizationsRelationship && (
                <Chip variant="outlined" color="warning" size="sm">
                  {organizationsRelationship}
                </Chip>
              )}
            </Stack>
            {descriptions.length > 0 && (
              <List
                size="sm"
                sx={{ "--List-padding": "0px", "--ListItem-paddingX": "0px" }}
              >
                {descriptions.map((description) => (
                  <ListItem key={description}>{description}</ListItem>
                ))}
              </List>
            )}
            {supportingDocuments.length > 0 && (
              <List
                size="sm"
                sx={{
                  "--List-radius": "var(--joy-radius-sm)",
                  "--List-padding": "0px",
                  "--ListItemDecorator-size":
                    "calc(80px + var(--ListItem-paddingX))",
                }}
              >
                {supportingDocuments.map(({ title, url }) => (
                  <ListItem key={title}>
                    <ListItemButton component="a" href={url} target="_blank">
                      <ListItemDecorator
                        sx={{ ml: "calc(var(--ListItem-paddingX) * -1)" }}
                      >
                        <SupportingDocumentImage src={url} />
                      </ListItemDecorator>
                      {title}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
            {tags.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {tags.map((tag) => (
                  <Chip key={tag} color="primary" size="sm">
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

TimelineItem.displayName = "TimelineItem";
// @ts-expect-error MUI specific checking
TimelineItem.muiName = "Grid";

export default TimelineItem;
