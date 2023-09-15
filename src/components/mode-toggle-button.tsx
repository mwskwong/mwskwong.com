'use client';

import { NoSsr } from '@mui/base/NoSsr';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';
import { FC } from 'react';

export type ModeToggleButtonProps = Omit<IconButtonProps, 'children'>;
export const ModeToggleButton: FC<ModeToggleButtonProps> = (props) => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      aria-label="Toggle mode"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      size="sm"
      variant="outlined"
      {...props}
    >
      <NoSsr>
        {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
      </NoSsr>
    </IconButton>
  );
};
