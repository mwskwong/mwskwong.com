'use client';

import { NoSsr } from '@mui/base';
import { IconButton, type IconButtonProps, useColorScheme } from '@mui/joy';
import { Moon, Sun } from 'lucide-react';
import { type FC } from 'react';

export type ModeToggleButtonProps = Omit<IconButtonProps, 'children'>;
export const ModeToggleButton: FC<ModeToggleButtonProps> = (props) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolvedMode = mode === 'system' ? systemMode : mode;

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
      {...props}
    >
      <NoSsr>{resolvedMode === 'light' ? <Sun /> : <Moon />}</NoSsr>
    </IconButton>
  );
};
