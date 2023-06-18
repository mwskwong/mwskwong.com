import { Chip, Sheet, Stack, StackProps, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC, ReactNode } from "react";

type Props = StackProps & {
  name?: string;
  skills?: string[];
  icon?: ReactNode;
};

const SKillCategory: FC<Props> = ({
  name,
  skills = [],
  sx,
  icon,
  ...props
}) => {
  return (
    <Stack spacing={2} sx={mergeSx({ alignItems: "center" }, sx)} {...props}>
      <Sheet
        variant="outlined"
        sx={{
          display: "flex",
          borderRadius: "sm",
          p: 1.5,
          "--Icon-fontSize": (theme) => theme.vars.fontSize.xl4,
        }}
      >
        {icon}
      </Sheet>
      <Typography level="h6" component="h4" color="primary">
        {name}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", flexWrap: "wrap" }}
      >
        {skills.map((skill) => (
          <Chip key={skill} color="neutral" variant="outlined">
            {skill}
          </Chip>
        ))}
      </Stack>
    </Stack>
  );
};

export default SKillCategory;
