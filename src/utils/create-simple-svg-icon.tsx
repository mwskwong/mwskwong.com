import SvgIcon, { SvgIconProps } from '@mui/joy/SvgIcon';
import mergeSx from 'merge-sx';
import { FC, forwardRef, memo } from 'react';
import { SimpleIcon } from 'simple-icons';

export interface SimpleSvgIconProps extends Omit<SvgIconProps, 'color'> {
  color?: 'branding' | SvgIconProps['color'];
}

export const createSimpleSvgIcon = (
  simpleIcon: SimpleIcon,
  displayName: string,
) => {
  const SimpleSvgIcon: FC<SimpleSvgIconProps> = forwardRef(
    ({ color, sx, ...props }, ref) => (
      <SvgIcon
        color={color === 'branding' ? undefined : color}
        htmlColor={color === 'branding' ? `#${simpleIcon.hex}` : undefined}
        ref={ref}
        sx={mergeSx({ p: 'var(--MaterialIcon-padding)' }, sx)}
        {...props}
      >
        <path d={simpleIcon.path} />
      </SvgIcon>
    ),
  );

  SimpleSvgIcon.displayName = displayName;
  // @ts-expect-error MUI specific checking
  SimpleSvgIcon.muiName = 'SvgIcon';

  return memo(SimpleSvgIcon);
};
