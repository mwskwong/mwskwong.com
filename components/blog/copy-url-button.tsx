'use client';

import { IconButton, IconButtonProps, Tooltip } from '@mui/joy';
import { Check, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

import { baseUrl } from '@/constants/site-config';

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
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <Tooltip title="Copy blog url">
      <IconButton
        aria-pressed={copied}
        color={copied ? 'success' : undefined}
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          timeout.current = setTimeout(() => setCopied(false), 1000);
        }}
        sx={{
          '&[aria-pressed="true"]:not(:active)': {
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: (theme) =>
                theme.vars.palette[copied ? 'success' : 'neutral'].plainHoverBg,
            },
          },
        }}
        {...props}
      >
        {copied ? <Check /> : <Copy />}
      </IconButton>
    </Tooltip>
  );
};
