"use client";

import Grid, { GridProps } from "@mui/joy/Grid";
import { Children, FC, cloneElement, isValidElement } from "react";

const Timeline: FC<GridProps> = ({ children, ...props }) => (
  <Grid container spacing={6} disableEqualOverflow {...props}>
    {/* WORKAROUND: nested grid doesn't work when the parent is an RSC, manually assigning the level */}
    {Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          unstable_level: ((child.props as GridProps).unstable_level ?? 0) + 1,
        } as GridProps);
      }

      return child;
    })}
  </Grid>
);

export default Timeline;
