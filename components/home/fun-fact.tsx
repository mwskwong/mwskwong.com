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
import { simpleIconsClasses } from "@/theme/classes";

const FunFact: FC<SheetProps> = ({ sx, ...props }) => (
  <Sheet
    component="section"
    variant="solid"
    color="primary"
    invertedColors
    sx={mergeSx(
      {
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
            "--Icon-fontSize": "var(--joy-fontSize-xl7)",
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
                <Icon className={simpleIconsClasses.root} />
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
