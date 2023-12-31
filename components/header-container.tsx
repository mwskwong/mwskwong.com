'use client';

import Box, { BoxProps } from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { FC } from 'react';

export type HeaderContainerProps = BoxProps<'header'>;
export const HeaderContainer: FC<HeaderContainerProps> = ({
  children,
  ...props
}) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
    <Box
      alignItems="center"
      bgcolor="background.body"
      boxShadow={(theme) =>
        trigger
          ? `0 1px ${theme.vars.palette.neutral.outlinedBorder}`
          : undefined
      }
      component="header"
      display="flex"
      height="var(--Header-height)"
      position="sticky"
      top={0}
      zIndex="header"
      {...props}
    >
      <Container>{children}</Container>
    </Box>
  );
};
