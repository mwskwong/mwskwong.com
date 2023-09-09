import { Container, Typography } from '@mui/joy';
import { FC } from 'react';

const NotFound: FC = () => (
  <Container
    component="main"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap: 2,
      flex: 1,
      textAlign: 'center',
    }}
  >
    <Typography color="primary" level="body-sm">
      404 error
    </Typography>
    <Typography level="h1">We can&apos;t find that page</Typography>
    <Typography>
      Sorry, the page you are looking for doesn&apos;t exist or has been moved.
    </Typography>
  </Container>
);

export default NotFound;
