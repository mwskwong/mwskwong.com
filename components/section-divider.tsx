import { Box, BoxProps } from '@mui/joy';
import { mergeSx } from 'merge-sx';
import { FC } from 'react';

export type SectionDividerProps = Omit<BoxProps<'svg'>, 'children'>;
export const SectionDivider: FC<SectionDividerProps> = ({ sx, ...props }) => (
  <Box
    component="svg"
    sx={mergeSx({ color: 'background.body' }, sx)}
    viewBox="0 0 1200 120"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="currentColor" />
  </Box>
);
