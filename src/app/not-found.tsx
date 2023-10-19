import { KeyboardArrowRightRounded } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/joy';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const NotFound: FC = () => (
  <Container
    component="main"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '1000vh',
      textAlign: 'center',
    }}
  >
    <Typography color="primary" fontSize="8rem" fontWeight="md" level="h1">
      404
    </Typography>
    <Stack alignItems={{ sm: 'center' }} spacing={2}>
      <Typography level="h2">We can&apos;t find that page</Typography>
      <Typography>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </Typography>
      <Button
        component={Link}
        endDecorator={<KeyboardArrowRightRounded />}
        href="/"
        size="lg"
      >
        Back To Home
      </Button>
    </Stack>
  </Container>
);

export const metadata: Metadata = { title: 'Not Found' };

export default NotFound;
