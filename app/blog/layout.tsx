import Box from "@mui/joy/Box";
import { FC, PropsWithChildren } from "react";

const BlogLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box component="main" py="var(--Section-paddingY)" flex={1}>
    {children}
  </Box>
);

export default BlogLayout;
