import { DashboardRounded } from "@mui/icons-material";
import { Chip, Sheet, Stack, StackProps, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

interface Props extends StackProps {
  category?: string;
  skills?: string[];
}

const SKillCategory: FC<Props> = ({ category, skills = [], sx, ...props }) => {
  return (
    <Stack spacing={2} sx={mergeSx({ alignItems: "center" }, sx)} {...props}>
      <Sheet
        variant="outlined"
        sx={{ display: "flex", borderRadius: "sm", p: 1.5 }}
      >
        <DashboardRounded fontSize="xl4" />
      </Sheet>
      <Typography level="h6" component="h4" color="primary">
        {category}
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
