'use client';

import { Button, Container, Link, Stack, Typography } from '@mui/joy';
import { FC } from 'react';

import { email } from '@/constants/content';

const Error: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => (
  <Container
    component="main"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    }}
  >
    <Typography color="primary" fontSize="8rem" fontWeight="md" level="h1">
      500
    </Typography>
    <Stack alignItems={{ sm: 'center' }} spacing={2}>
      <Typography level="h2">Something went wrong</Typography>
      <Typography>
        {error.message}. Please{' '}
        <Link href={`mailto:${email}`} underline="always">
          email me
        </Link>
        {error.digest ? (
          <>
            {' with the this error digest: '}
            <Typography fontFamily="code" fontSize="0.875em" variant="soft">
              {error.digest}
            </Typography>
          </>
        ) : null}{' '}
        to report the issue.
      </Typography>
      <Button onClick={reset} size="lg">
        Try Again
      </Button>
    </Stack>
  </Container>
);

export default Error;
