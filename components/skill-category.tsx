import { DashboardRounded } from "@mui/icons-material";
import { Box, Chip, Stack, StackProps, Typography } from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

interface Props extends StackProps {
  category?: string;
  skills?: string[];
}

const SKillCategory: FC<Props> = ({ category, skills = [], sx, ...props }) => {
  return (
    <Stack spacing={2} sx={mergeSx({ alignItems: "center" }, sx)} {...props}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "sm",
          p: 1.5,
          color: "neutral.softColor",
          bgcolor: "neutral.softBg",
        }}
      >
        <DashboardRounded fontSize="xl4" />
      </Box>
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
