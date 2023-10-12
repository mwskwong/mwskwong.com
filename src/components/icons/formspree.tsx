import { SvgIcon, SvgIconProps } from '@mui/joy';
import { FC, forwardRef } from 'react';

export const Formspree: FC<SvgIconProps> = forwardRef((props, ref) => (
  <SvgIcon
    htmlColor={props.color === 'branding' ? '#E5122E' : undefined}
    ref={ref}
    viewBox="-2 -2 28 28"
    {...props}
  >
    <path d="M1 2C1 0.89543 1.89543 0 3 0H20.3334C21.4378 0 22.3334 0.89543 22.3334 2V4.85715C22.3334 5.96171 21.4378 6.85714 20.3334 6.85714H3C1.89543 6.85714 1 5.96171 1 4.85715V2ZM1 10.5715C1 9.46688 1.89543 8.57145 3 8.57145H20.3334C21.4378 8.57145 22.3334 9.46688 22.3334 10.5715V13.4286C22.3334 14.5332 21.4378 15.4286 20.3334 15.4286H3C1.89543 15.4286 1 14.5332 1 13.4286V10.5715ZM3 17.1429C1.89543 17.1429 1 18.0383 1 19.143V22C1 23.1046 1.89543 24 3 24H11C12.1046 24 13 23.1046 13 22V19.143C13 18.0383 12.1046 17.1429 11 17.1429H3Z" />
  </SvgIcon>
));

Formspree.displayName = 'Formspree';
