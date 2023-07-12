import { Box, BoxProps } from "@mui/joy";
import mergeSx from "merge-sx";
import { FC } from "react";

const Divider: FC<BoxProps<"svg">> = ({ sx, ...props }) => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    sx={mergeSx({ color: "background.body" }, sx)}
    {...props}
  >
    <path fill="currentColor" d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
  </Box>
);

export default Divider;
