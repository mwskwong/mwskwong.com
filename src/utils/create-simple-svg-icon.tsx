import { SvgIcon, SvgIconProps } from '@mui/joy';
import { FC, forwardRef, memo } from 'react';
import { SimpleIcon } from 'simple-icons';

export const createSimpleSvgIcon = (
  simpleIcon: SimpleIcon,
  displayName: string,
) => {
  const SimpleSvgIcon: FC<SvgIconProps> = forwardRef((props, ref) => (
    <SvgIcon
      htmlColor={props.color === 'branding' ? `#${simpleIcon.hex}` : undefined}
      ref={ref}
      viewBox="-2 -2 28 28"
      {...props}
    >
      <path d={simpleIcon.path} />
    </SvgIcon>
  ));

  SimpleSvgIcon.displayName = displayName;
  // @ts-expect-error MUI specific checking
  SimpleSvgIcon.muiName = 'SvgIcon';

  return memo(SimpleSvgIcon);
};
