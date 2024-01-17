'use client'; // FIXME: for the sake of using styled() to add sx props to Image, may not be needed once zero CSS runtime is in place

import { styled } from '@mui/joy';
import NextImage from 'next/image';
import { ComponentProps } from 'react';

export const Image = styled(NextImage)``;
export type ImageProps = ComponentProps<typeof Image>;
