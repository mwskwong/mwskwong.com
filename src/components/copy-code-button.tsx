'use client';

import { IconButton, type IconButtonProps } from '@mui/joy';
import { Check, Copy } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

export type CopyCodeButtonProps = Omit<IconButtonProps, 'children'>;

export const CopyCodeButton: FC<CopyCodeButtonProps> = (props) => {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <IconButton
      aria-label="Copy code"
      color={copied ? 'success' : undefined}
      onClick={async (event) => {
        const figure = event.currentTarget.closest(
          '[data-rehype-pretty-code-figure]',
        );
        const code = figure?.querySelector('code');

        if (code?.textContent) {
          await navigator.clipboard.writeText(code.textContent);
          setCopied(true);
          timeout.current = setTimeout(() => setCopied(false), 1000);
        }
      }}
      {...props}
    >
      {copied ? <Check /> : <Copy />}
    </IconButton>
  );
};
