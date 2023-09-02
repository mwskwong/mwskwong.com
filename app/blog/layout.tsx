import Box from "@mui/joy/Box";
import { FC, PropsWithChildren } from "react";

const BlogLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box component="main" py="var(--Section-paddingY)">
    {children}
  </Box>
);

export default BlogLayout;
