"use client";

import { IconButton, type IconButtonProps } from "@radix-ui/themes";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { type FC, useEffect, useRef, useState } from "react";

export type CopyCodeButtonProps = Omit<IconButtonProps, "children">;
export const CopyCodeButton: FC<CopyCodeButtonProps> = (props) => {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <IconButton
      aria-label="copy code"
      color="gray"
      size="1"
      variant="ghost"
      onClick={async (event) => {
        const code = event.currentTarget.parentElement?.querySelector("code");
        if (code?.textContent) {
          await navigator.clipboard.writeText(code.textContent);
          setCopied(true);
          timeout.current = setTimeout(() => setCopied(false), 1000);
        }
      }}
      {...props}
    >
      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
    </IconButton>
  );
};
