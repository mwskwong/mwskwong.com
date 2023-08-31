"use client";

import { LinkRounded } from "@mui/icons-material";
import Link from "@mui/joy/Link";
import Typography, {
  TypographyProps,
  typographyClasses,
} from "@mui/joy/Typography";
import { kebabCase } from "lodash-es";
import mergeSx from "merge-sx";
import { FC } from "react";

const Heading: FC<TypographyProps> = ({ sx, ...props }) => {
  const hash =
    typeof props.children === "string" ? kebabCase(props.children) : undefined;

  return (
    <Typography
      id={hash}
      endDecorator={
        <Link
          level="body-md"
          variant="outlined"
          aria-labelledby={hash}
          href={`#${hash}`}
          borderRadius="sm"
        >
          <LinkRounded />
        </Link>
      }
      sx={mergeSx(
        {
          [`& .${typographyClasses.endDecorator}`]: {
            visibility: "hidden",
          },
          "&:hover": {
            [`& .${typographyClasses.endDecorator}`]: {
              visibility: "unset",
            },
          },
        },
        sx,
      )}
      {...props}
    />
  );
};

export default Heading;
