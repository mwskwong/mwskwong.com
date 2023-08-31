import Grid, { GridProps } from "@mui/joy/Grid";
import { FC } from "react";

const Timeline: FC<GridProps> = ({ children, ...props }) => (
  <Grid container spacing={6} disableEqualOverflow {...props}>
    {children}
  </Grid>
);

export default Timeline;
