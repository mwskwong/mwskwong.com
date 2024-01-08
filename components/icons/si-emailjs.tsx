import { IconType } from '@icons-pack/react-simple-icons';
import { forwardRef } from 'react';

export const SiEmailjsHex = '#fca253';
export const SiEmailjs: IconType = forwardRef(
  ({ title = 'EmailJs', color = 'currentColor', size = 24, ...props }, ref) => (
    <svg
      fill={color === 'default' ? SiEmailjsHex : color}
      height={size}
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <path d="M22.823 0h-9.015c-.621 0-1.125.504-1.125 1.125v9.014c0 .622.504 1.126 1.125 1.126h9.015c.62 0 1.125-.504 1.125-1.126V1.126C23.948.504 23.444 0 22.823 0Z" />
      <path d="M10.084 11.94V3.212a1.366 1.366 0 0 0-1.369-1.368c-.362 0-.71.144-.967.4L.758 9.235a2.59 2.59 0 0 0 0 3.663l10.346 10.345a2.59 2.59 0 0 0 3.663 0l6.99-6.99a1.368 1.368 0 0 0 0-1.935l-.054-.052a1.367 1.367 0 0 0-.967-.401h-8.729a1.921 1.921 0 0 1-1.923-1.924Z" />
    </svg>
  ),
);

SiEmailjs.displayName = 'SiEmailjs';
