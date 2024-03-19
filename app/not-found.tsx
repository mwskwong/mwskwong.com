import { Button, Container, Stack, Typography } from '@mui/joy';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const NotFound: FC = () => (
  <Container
    component="main"
    maxWidth="md"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    }}
  >
    <Typography color="primary" level="h1" sx={{ fontSize: '8rem' }}>
      404
    </Typography>
    <Stack spacing={2} sx={{ alignItems: { sm: 'center' } }}>
      <Typography level="h2">We can&apos;t find that page</Typography>
      <Typography>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </Typography>
      <Button
        component={Link}
        href="/"
        size="lg"
        startDecorator={<ArrowLeft />}
      >
        Back To Home
      </Button>
    </Stack>
  </Container>
);

export const metadata = { title: 'Not Found' } satisfies Metadata;

export default NotFound;
