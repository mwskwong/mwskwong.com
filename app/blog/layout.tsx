import Container from "@mui/joy/Container";
import { FC, PropsWithChildren } from "react";

const BlogLayout: FC<PropsWithChildren> = ({ children }) => (
  <Container sx={{ py: "var(--Section-paddingY)", flex: 1 }}>
    {children}
  </Container>
);

export default BlogLayout;
