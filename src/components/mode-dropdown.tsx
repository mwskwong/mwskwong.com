'use client';

import { NoSsr } from '@mui/base';
import {
  Dropdown,
  type DropdownProps,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  type MenuButtonProps,
  MenuItem,
  useColorScheme,
} from '@mui/joy';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { type FC } from 'react';

const modeOptions = [
  { mode: 'light', label: 'Light', icon: <Sun /> },
  { mode: 'dark', label: 'Dark', icon: <Moon /> },
  { mode: 'system', label: 'System', icon: <SunMoon /> },
] as const;

export interface ModeDropdownProps extends Omit<DropdownProps, 'children'> {
  slotProps?: {
    menuButton?: MenuButtonProps;
  };
}

export const ModeDropdown: FC<ModeDropdownProps> = ({
  slotProps,
  ...props
}) => {
  const { mode, systemMode, setMode } = useColorScheme();

  return (
    <Dropdown {...props}>
      <MenuButton slots={{ root: IconButton }} {...slotProps?.menuButton}>
        <NoSsr>
          {
            modeOptions.find(
              (option) =>
                option.mode === (mode === 'system' ? systemMode : mode),
            )?.icon
          }
        </NoSsr>
      </MenuButton>
      <Menu>
        {modeOptions.map(({ mode, label, icon }) => (
          <MenuItem key={mode} onClick={() => setMode(mode)}>
            <ListItemDecorator>{icon}</ListItemDecorator>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};
