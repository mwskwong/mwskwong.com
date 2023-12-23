'use client';

import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { Check, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

import { baseUrl } from '@/constants/base-url';

export interface ActionsProps {
  blog: {
    id: string;
    categories?: string[];
    title: string;
  };
}

export const CopyUrlButton: FC<Omit<IconButtonProps, 'children'>> = (props) => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const url = `${baseUrl}${pathname}`;

  return (
    <IconButton
      aria-label="copy blog url"
      color={copied ? 'success' : undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
      {...props}
    >
      {copied ? <Check /> : <Copy />}
    </IconButton>
  );
};
