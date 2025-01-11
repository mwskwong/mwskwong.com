"use client";

import { type FC, useEffect } from "react";

import { incrementBlogPostView } from "@/lib/actions";

export interface IncrViewProps {
  id: string;
}
export const IncrementView: FC<IncrViewProps> = ({ id }) => {
  useEffect(() => void incrementBlogPostView(id), [id]);
  // eslint-disable-next-line unicorn/no-null
  return null;
};
