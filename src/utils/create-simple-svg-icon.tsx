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
      /**
       * Material Icons add 2dp padding surrounds the living area, while Simple Icons don't have that.
       * Modify the view box to align with that standard
       * @see {@link https://m3.material.io/styles/icons/designing-icons#089c3a26-5991-4241-8bbe-8a5ff2014247}
       */
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
