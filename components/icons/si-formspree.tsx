import { IconType } from '@icons-pack/react-simple-icons';
import { forwardRef } from 'react';

export const SiFormspreeHex = '#E5122E';
export const SiFormspree: IconType = forwardRef(
  (
    { title = 'Formspree', color = 'currentColor', size = 24, ...props },
    ref,
  ) => (
    <svg
      fill={color === 'default' ? SiFormspreeHex : color}
      height={size}
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <path d="M1 2a2 2 0 0 1 2-2h17.333a2 2 0 0 1 2 2v2.857a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2Zm0 8.572a2 2 0 0 1 2-2h17.333a2 2 0 0 1 2 2v2.857a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2.857Zm2 6.57a2 2 0 0 0-2 2.001V22a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.857a2 2 0 0 0-2-2H3Z" />
    </svg>
  ),
);

SiFormspree.displayName = 'SiFormspree';
