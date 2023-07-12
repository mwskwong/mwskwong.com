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
} from "@mui/joy";
import { FC, Fragment, forwardRef } from "react";

import Image from "@/components/image";
import { thumIoLoader } from "@/utils/image-loaders";

interface Props extends GridProps {
  from?: Date;
  to?: Date;
  title?: string;
  organizations?: {
    name: string;
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
    ref
  ) => {
    const duration = to
      ? dateFormatter.formatRange(from, to)
      : `${dateFormatter.format(from)} - Present`;

    return (
      <Grid
        ref={ref}
        container
        rowSpacing={0}
        columnSpacing={2}
        xs={12}
        {...props}
      >
        <Grid xs={12} sm={3}>
          <Typography
            level="body3"
            sx={{ textTransform: "uppercase", mt: 0.5, mb: 1 }}
          >
            {duration}
          </Typography>
        </Grid>
        <Grid xs={12} sm>
          <Typography level="h6" component="h3">
            {title}
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
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
                <Chip variant="outlined" color="info" size="sm">
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
                        <Image
                          loader={thumIoLoader}
                          src={url}
                          alt={title}
                          width={80}
                          height={56}
                          sx={{
                            objectFit: "cover",
                            objectPosition: "top",
                            flexShrink: 0,
                            borderRadius: "var(--unstable_List-childRadius)",
                            border: 1,
                            borderColor: "neutral.outlinedBorder",
                          }}
                        />
                      </ListItemDecorator>
                      {title}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
            {tags.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {tags.map((tag) => (
                  <Chip key={tag} variant="soft" size="sm">
                    {tag}
                  </Chip>
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }
);

TimelineItem.displayName = "TimelineItem";
// @ts-expect-error MUI specific checking on nested grid
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
TimelineItem.muiName = Grid.muiName;

export default TimelineItem;
