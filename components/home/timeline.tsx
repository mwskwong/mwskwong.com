"use client";

import { Grid, GridProps } from "@mui/joy";
import { unstable_isMuiElement as isMuiElement } from "@mui/utils";
import { Children, FC, cloneElement, isValidElement } from "react";

const Timeline: FC<GridProps> = ({ children, ...props }) => (
  <Grid container spacing={6} disableEqualOverflow {...props}>
    {/* WORKAROUND: nested grid doesn't work when the parent is an RSC, manually assigning the level */}
    {Children.map(children, (child) => {
      if (
        isValidElement(child) &&
        (isMuiElement(child, ["Grid"]) ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          (child.type as any)?._payload?.value?.muiName === "Grid")
      ) {
        return cloneElement(child, {
          unstable_level: ((child.props as GridProps).unstable_level ?? 0) + 1,
        } as GridProps);
      }

      return child;
    })}
  </Grid>
);

export default Timeline;
