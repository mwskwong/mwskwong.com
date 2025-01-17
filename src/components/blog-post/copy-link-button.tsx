"use client";

import { IconButton, type IconButtonProps } from "@radix-ui/themes";
import { IconCheck, IconLink } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { type FC, useEffect, useRef, useState } from "react";

import { siteUrl } from "@/constants/site-config";

export type CopyLinkButtonProps = Omit<IconButtonProps, "children">;
export const CopyLinkButton: FC<CopyLinkButtonProps> = (props) => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <IconButton
      aria-label="copy link"
      color="gray"
      variant="ghost"
      onClick={async () => {
        await navigator.clipboard.writeText(`${siteUrl}${pathname}`);
        setCopied(true);
        timeout.current = setTimeout(() => setCopied(false), 1000);
      }}
      {...props}
    >
      {copied ? <IconCheck size={20} /> : <IconLink size={20} />}
    </IconButton>
  );
};
