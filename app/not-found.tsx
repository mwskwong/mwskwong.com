import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

const NotFound: FC = () => (
  <Container
    component="main"
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      gap: 2,
      flex: 1,
      textAlign: "center",
    }}
  >
    <Typography level="body-sm" color="primary">
      404 error
    </Typography>
    <Typography level="h1">{"We can't find that page"}</Typography>
    <Typography>
      {"Sorry, the page you are looking for doesn't exist or has been moved."}
    </Typography>
  </Container>
);

export default NotFound;
