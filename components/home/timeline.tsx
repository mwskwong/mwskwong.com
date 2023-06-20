import { OpenInNewRounded } from "@mui/icons-material";
import { Chip, Grid, Link, List, ListItem, Stack, Typography } from "@mui/joy";
import { FC } from "react";

const Timeline: FC = () => {
  return (
    <Grid container spacing={6} disableEqualOverflow>
      <Grid container rowSpacing={0} columnSpacing={2} xs>
        <Grid xs={12} sm={3}>
          <Typography
            level="body3"
            sx={{ textTransform: "uppercase", mt: 0.5, mb: 1 }}
          >
            Oct 2022 — Present
          </Typography>
        </Grid>
        <Grid xs={12} sm>
          <Typography level="h6" component="h3">
            Frontend Engineer
          </Typography>
          <Link
            href="https://www.tecpal.com/"
            target="_blank"
            endDecorator={<OpenInNewRounded />}
          >
            TecPal Ltd.
          </Link>
          <List size="sm" sx={{ "--ListItem-paddingX": "0px" }}>
            <ListItem>
              Facilitated the seamless migration of Vue apps from a legacy
              WordPress API to a modern RESTful API.
            </ListItem>
            <ListItem>
              Orchestrated the successful implementation of features in Vue and
              React apps, including an authorization system, shopping list, and
              customer review.
            </ListItem>
            <ListItem>
              Conducted technical review and spearheaded proof-of-concept
              development for web application migration from Vue to Astro and
              Next.js.
            </ListItem>
            <ListItem>
              Pioneered the implementation of Turborepo, establishing the
              fundamental groundwork for the successful transition.
            </ListItem>
          </List>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            <Chip variant="soft">Create React App</Chip>
            <Chip variant="soft">MUI</Chip>
            <Chip variant="soft">Next.js</Chip>
            <Chip variant="soft">React</Chip>
            <Chip variant="soft">Zustand</Chip>
            <Chip variant="soft">React Query</Chip>
            <Chip variant="soft">React Router</Chip>
            <Chip variant="soft">Vue</Chip>
            <Chip variant="soft">Vuetify</Chip>
            <Chip variant="soft">Vuex</Chip>
            <Chip variant="soft">Pinia</Chip>
            <Chip variant="soft">Quasar</Chip>
            <Chip variant="soft">Turborepo</Chip>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Timeline;
