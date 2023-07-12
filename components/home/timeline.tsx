import { Grid, GridProps } from "@mui/joy";
import { FC } from "react";

const Timeline: FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid container spacing={6} disableEqualOverflow {...props}>
      {children}
    </Grid>
  );
};

export default Timeline;
