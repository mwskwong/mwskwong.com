import Box, { BoxProps } from "@mui/joy/Box";
import { FC } from "react";

const Divider: FC<BoxProps<"svg">> = (props) => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    color="background.body"
    {...props}
  >
    <path fill="currentColor" d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
  </Box>
);

export default Divider;
