import { IconType } from "@icons-pack/react-simple-icons/types";
import { Box, Card, CardContent, CardProps, Link, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

interface Props extends CardProps {
  institution?: {
    id: string;
    name?: string;
  };
  certificate?: string;
  name?: string;
}

const CourseCard: FC<Props> = ({
  institution,
  certificate,
  name,
  sx,
  ...props
}) => {
  const Icon =
    institution && (getIconByContentfulId(institution.id) as IconType);

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={mergeSx(
        {
          "--Icon-fontSize": (theme) => theme.vars.fontSize.xl4,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
        },
        sx
      )}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 45,
        }}
      >
        {Icon && <Icon color="default" />}
      </Box>
      <CardContent>
        <Link
          overlay
          underline="none"
          href={certificate}
          target="_blank"
          sx={{ color: "inherit" }}
        >
          {name}
        </Link>
        <Typography level="body2">{institution?.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
