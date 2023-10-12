import { SvgIcon, SvgIconProps } from '@mui/joy';
import { FC, forwardRef } from 'react';

export const Formspree: FC<SvgIconProps> = forwardRef((props, ref) => (
  <SvgIcon
    htmlColor={props.color === 'branding' ? '#E5122E' : undefined}
    ref={ref}
    /**
     * Material Icons add 2dp padding surrounds the living area, while this icon doesn't have that.
     * Modify the view box to align with that standard
     * @see {@link https://m3.material.io/styles/icons/designing-icons#089c3a26-5991-4241-8bbe-8a5ff2014247}
     */
    viewBox="-2 -2 28 28"
    {...props}
  >
    <path d="M1 2a2 2 0 0 1 2-2h17.333a2 2 0 0 1 2 2v2.857a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2Zm0 8.572a2 2 0 0 1 2-2h17.333a2 2 0 0 1 2 2v2.857a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2.857Zm2 6.57a2 2 0 0 0-2 2.001V22a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.857a2 2 0 0 0-2-2H3Z" />
  </SvgIcon>
));

Formspree.displayName = 'Formspree';
