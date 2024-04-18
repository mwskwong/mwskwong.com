'use client';

import { styled } from '@mui/joy';
import NextImage from 'next/image';
import { type ComponentProps } from 'react';

export const Image = styled(NextImage)``;
export type ImageProps = ComponentProps<typeof Image>;
