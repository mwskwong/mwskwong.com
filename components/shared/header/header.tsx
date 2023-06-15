"use client";

import { Box, BoxProps, Container } from "@mui/joy";
import { FC } from "react";

type Props = Omit<BoxProps<"header">, "children">;

const Header: FC<Props> = (props) => {
  return (
    <Box
      component="header"
      position="sticky"
      top={0}
      bgcolor="background.surface"
      width="100%"
      borderBottom={1}
      borderColor="divider"
      {...props}
    >
      <Container sx={{ py: 1 }}>Logo</Container>
    </Box>
  );
};

export default Header;
