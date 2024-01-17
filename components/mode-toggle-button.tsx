'use client';

import { NoSsr } from '@mui/base';
import { IconButton, IconButtonProps, Tooltip, useColorScheme } from '@mui/joy';
import { Moon, Sun } from 'lucide-react';
import { FC } from 'react';

export type ModeToggleButtonProps = Omit<IconButtonProps, 'children'>;
export const ModeToggleButton: FC<ModeToggleButtonProps> = (props) => {
  const { mode, setMode } = useColorScheme();

  return (
    <Tooltip title="Toggle color mode">
      <IconButton
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        {...props}
      >
        <NoSsr>{mode === 'dark' ? <Sun /> : <Moon />}</NoSsr>
      </IconButton>
    </Tooltip>
  );
};
