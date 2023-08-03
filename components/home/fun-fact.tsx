import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Sheet,
  SheetProps,
  Stack,
  Typography,
} from "@mui/joy";
import mergeSx from "merge-sx";
import { FC } from "react";

import { websiteTechStack } from "@/constants/data";

const FunFact: FC<SheetProps> = ({ sx, ...props }) => (
  <Sheet
    component="section"
    variant="solid"
    color="primary"
    invertedColors
    sx={mergeSx(
      {
        // TODO: contrast not enough. May be this will change in the future?
        "--joy-palette-text-secondary": "var(--joy-palette-primary-100)",
        "--joy-palette-text-tertiary": "var(--joy-palette-primary-200)",
        "& ::selection": {
          bgcolor: "var(--variant-solidBg)",
          color: "var(--variant-solidColor)",
        },
      },
      sx,
    )}
    {...props}
  >
    <Container>
      <Stack
        spacing={6}
        sx={{ alignItems: { sm: "center" }, textAlign: "center" }}
      >
        <Stack spacing={2}>
          <Typography level="h2">Fun Fact</Typography>
          <Typography>
            This website is built on top of the following technologies and
            platforms.
          </Typography>
        </Stack>
        <Grid
          container
          spacing={6}
          sx={{
            justifyContent: "center",
          }}
          disableEqualOverflow
        >
          {websiteTechStack.map(({ name, Icon, url }) => (
            <Grid key={name} xs={6} sm={3}>
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                }}
                component="a"
                href={url}
                target="_blank"
              >
                <Icon sx={{ fontSize: "3.75rem" }} />
                <Typography>{name}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography>...and more</Typography>
        <Button
          size="lg"
          endDecorator={<KeyboardArrowRightRounded />}
          component="a"
          href="https://github.com/mwskwong/resume"
          target="_blank"
        >
          See the source code
        </Button>
      </Stack>
    </Container>
  </Sheet>
);

export default FunFact;
