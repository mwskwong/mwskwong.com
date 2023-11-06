'use client';

import { Box, BoxProps, Theme } from '@mui/joy';
import { applySolidInversion } from '@mui/joy/colorInversion';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

// this wrapper is created because applySolidInversion is a client function and Box is a client component
// that can't be used directly in FunFact, which is a server component that requires data fetching.
// FIXME: In the future, when Joy UI moves to zero runtime CSS library, I may be able to merge it back
export type FunFactWrapperProps = BoxProps<'section'>;
export const FunFactWrapper: FC<FunFactWrapperProps> = ({ sx, ...props }) => (
  <Box
    bgcolor="primary.600"
    component="section"
    sx={mergeSx<Theme>(applySolidInversion('primary'), sx)}
    {...props}
  />
);
