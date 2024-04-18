'use client';

import { IconButton, type IconButtonProps } from '@mui/joy';
import { Check, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type FC, useEffect, useRef, useState } from 'react';

import { env } from '@/env.mjs';

export type CopyUrlButtonProps = Omit<IconButtonProps, 'children'>;

export const CopyUrlButton: FC<CopyUrlButtonProps> = (props) => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const url = env.NEXT_PUBLIC_SITE_URL + pathname;
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <IconButton
      aria-label="Copy blog url"
      color={copied ? 'success' : undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        timeout.current = setTimeout(() => setCopied(false), 1000);
      }}
      {...props}
    >
      {copied ? <Check /> : <Copy />}
    </IconButton>
  );
};
