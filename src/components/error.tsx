import {
  Container,
  type ContainerProps,
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { SectionDivider } from '@/components/section-divider';

export interface ErrorProps extends Omit<ContainerProps, 'children'> {
  statusCode: number | string;
  message: string;
}

export const Error: FC<ErrorProps> = ({
  statusCode,
  message,
  sx,
  ...props
}) => (
  <>
    <Container
      component="main"
      sx={mergeSx(
        { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        sx,
      )}
      {...props}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 1,
          columnGap: 2,
        }}
      >
        <Typography component="h1" level="h2">
          {statusCode}
        </Typography>
        <Divider
          orientation="vertical"
          sx={{ display: { xs: 'none', sm: 'unset' } }}
        />
        <Typography level="body-lg">{message}</Typography>
      </Stack>
    </Container>
    <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
  </>
);
