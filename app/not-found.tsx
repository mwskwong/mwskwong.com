import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

const NotFound: FC = () => (
  <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Typography level="h1" fontSize="xl7" color="primary">
      404
    </Typography>
    <Typography level="h2">Not Found</Typography>
    <Typography>The page you are looking for does not exist.</Typography>
  </Container>
);

export default NotFound;
