import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Link,
  Sheet,
  SheetProps,
  Stack,
  Typography,
} from "@mui/joy";
import mergeSx from "merge-sx";
import { FC } from "react";

import { websiteTechStack } from "@/constants/content";

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
      <Stack spacing={6} alignItems={{ sm: "center" }} textAlign="center">
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
          justifyContent="center"
          disableEqualOverflow
        >
          {websiteTechStack.map(({ name, Icon, url }) => (
            <Grid key={name} xs={6} sm={3}>
              <Stack spacing={2} position="relative" alignItems="center">
                <Icon fontSize="xl6" />
                <Link
                  overlay
                  textColor="text.secondary"
                  underline="none"
                  href={url}
                  target="_blank"
                >
                  {name}
                </Link>
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
