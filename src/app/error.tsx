'use client';

import { Button, Container, Link, Stack, Typography } from '@mui/joy';
import { RefreshCw } from 'lucide-react';
import { type FC } from 'react';

import { email } from '@/constants/content';

const Error: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => (
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
      Oops
    </Typography>
    <Stack spacing={2} sx={{ alignItems: { sm: 'center' } }}>
      <Typography level="h2">Something went wrong</Typography>
      <Typography>
        {error.message + (/[.!?]$/.test(error.message) ? '' : '.')} Please{' '}
        <Link href={`mailto:${email}`}>contact me</Link>
        {error.digest ? (
          <>
            {' with this error digest: '}
            <Typography
              sx={{ fontFamily: 'code', fontSize: '0.875em' }}
              variant="soft"
            >
              {error.digest}
            </Typography>
          </>
        ) : null}{' '}
        to report the issue.
      </Typography>
      <Button size="lg" startDecorator={<RefreshCw />} onClick={reset}>
        Try Again
      </Button>
    </Stack>
  </Container>
);

export default Error;
