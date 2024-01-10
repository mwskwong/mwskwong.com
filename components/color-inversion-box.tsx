'use client';

import Box, { BoxProps } from '@mui/joy/Box';
import {
  applySoftInversion,
  applySolidInversion,
} from '@mui/joy/colorInversion';
import { ColorPaletteProp, Theme } from '@mui/joy/styles';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

export interface ColorInversionBoxProps extends BoxProps {
  variant: 'solid' | 'soft';
  color: ColorPaletteProp;
  textColor?: BoxProps['color'];
}

// this wrapper is created because applySolidInversion and applySoftInversion are a client function that can't be used directly in RSC
// FIXME: In the future, when Joy UI moves to zero runtime CSS library, we may no longer need this wrapper
export const ColorInversionBox: FC<ColorInversionBoxProps> = ({
  variant,
  color,
  textColor,
  sx,
  ...props
}) => {
  const applyInversion =
    variant === 'solid' ? applySolidInversion : applySoftInversion;

  return (
    <Box
      color={textColor}
      sx={mergeSx<Theme>(applyInversion(color), sx)}
      {...props}
    />
  );
};
