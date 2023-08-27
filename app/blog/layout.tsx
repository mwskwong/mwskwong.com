import Container from "@mui/joy/Container";
import { FC, PropsWithChildren } from "react";

const BlogLayout: FC<PropsWithChildren> = ({ children }) => (
  <Container sx={{ pt: 6, flex: 1 }}>{children}</Container>
);

export default BlogLayout;
